import { http } from "@hypermode/modus-sdk-as";

export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}

@json
class Quote {

  @alias("q")
  quote!: string;


  @alias("a")
  author!: string;
}

export function getRandomQuote(): Quote {
  const request = new http.Request("https://zenquotes.io/api/random");
  const response = http.fetch(request);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch quote. Received: ${response.status} ${response.statusText}`,
    );
  }

  return response.json<Quote[]>()[0];
}