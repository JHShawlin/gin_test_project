package main

import (
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
	r := gin.Default()
	r.GET("/get_model", func(context *gin.Context) {
		context.JSON(200, Message{})
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
		fmt.Println(buf)
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
