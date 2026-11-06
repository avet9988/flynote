exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  let data;

  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }

  const secret = process.env.SECRET_CODE;

  if (!secret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Code not configured" })
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      correct: String(data.code || "") === secret
    })
  };
};
