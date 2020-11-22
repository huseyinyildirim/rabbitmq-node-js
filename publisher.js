const amqp = require("amqplib");

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    // RabbitMQ bağlanıyoruz
    const connection = await amqp.connect("amqp://localhost:5672");

    // Kanal oluşturuyoruz
    const channel = await connection.createChannel();

    // Her işlem için ayrı bir kuyruk oluşturabiliriz
    const assertion = await channel.assertQueue("queue");

    setInterval(() => {
        const message = {
            description: "Test mesajıdır. Zaman: " + new Date().getTime()
          };

        // Kuyruğa mesajımızı gönderiyoruz
        channel.sendToQueue("queue", Buffer.from(JSON.stringify(message)));

        console.log("Gönderilen Mesaj", message);
    }, 1000);

  } catch (error) {
    console.log("Error", error);
  }
}