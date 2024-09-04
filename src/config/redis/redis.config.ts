import { createClient, RedisClientType } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

async function main() {
  // Crear el cliente de Redis
  const client: RedisClientType = createClient({ url: redisUrl });

  // Manejar errores de Redis
  client.on("error", (err) => console.log("Redis Client Error", err));

  try {
    // Conectar al servidor de Redis
    await client.connect();

    // Establecer un valor en Redis
    await client.set("key", "value");

    // Obtener el valor de Redis
    const value = await client.get("key");
    console.log("Value from Redis:", value);

    // Desconectar del servidor de Redis
    await client.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Ejecutar la función principal
main();
