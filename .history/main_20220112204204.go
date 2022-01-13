package main

import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/gin-gonic/gin"
)

type Message struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Sex  string `json:"sex"`
}

func main() {
	//gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Static("/static", "html/static")
	r.Static("/img", "html/img")
	r.LoadHTMLFiles("html/index.html")
	r.GET("/get_model", func(context *gin.Context) {
		context.HTML(200, "index.html", nil)
	})
	r.POST("/send_message", func(c *gin.Context) {
		buf := make([]byte, 1024)
		n, _ := c.Request.Body.Read(buf)
		if n < 1 {
			c.JSON(200, gin.H{
				"result": "empty body",
			})
			return
		}
		index := bytes.IndexByte(buf, 0)
		buf = buf[:index]
		message := Message{}
		if err := json.Unmarshal(buf, &message); err != nil {
			fmt.Println(err)
			c.JSON(200, gin.H{
				"result": "unmarshal failed",
			})
			return
		}
		fmt.Println(message)
		c.JSON(200, gin.H{
			"result": "success",
		})
	})
	r.Run(":8888")
}
