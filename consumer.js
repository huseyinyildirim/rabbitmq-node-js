const amqp = require("amqplib");

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
      // RabbitMQ bağlanıyoruz
    const connection = await amqp.connect("amqp://localhost:5672");

    // Kanal oluşturuyoruz
    const channel = await connection.createChannel();

    // Oluşturduğumuz kanalı çağırmak için
    const assertion = await channel.assertQueue("queue");

    console.log("Mesaj bekleniyor...");
    channel.consume("queue", message => {
        const messageInfo = JSON.parse(message.content.toString())
        
        console.log("Alınan Kayıt", messageInfo);

        // Mesaj tekrar işlenmemesi için
        channel.ack(message);
    });
  } catch (error) {
    console.log("Error", error);
  }
}