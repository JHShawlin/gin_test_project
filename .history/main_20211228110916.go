package main

import "github.com/gin-gonic/gin"

type Message struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Sex  string `json:"sex"`
}

func main() {
	r := gin.Default()
	r.GET("/ping", func(context *gin.Context) {
		context.JSON(200, Message{})
	})

	r.Run() //8080
}
