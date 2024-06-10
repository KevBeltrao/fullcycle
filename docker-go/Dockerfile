FROM golang:1.22-alpine3.20 AS builder

WORKDIR /app

RUN go mod init github.com/KevBeltrao/fullcycle

RUN touch main.go

RUN echo -e 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Full Cycle Rocks!!")\n}' > main.go

RUN go build -o app .

FROM scratch

WORKDIR /app

COPY --from=builder /app/app .

CMD [ "./app" ]
