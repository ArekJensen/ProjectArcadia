import openai

# Sätt din API-nyckel här
openai.api_key = '7bde324de41a6d16'

# Exempel på en fråga till GPT-modellen
response = openai.Completion.create(
    engine="G",  # Specifiera GPT-3-modellen, t.ex. text-davinci-003 eller gpt-3.5-turbo
    prompt="Skriv en kort berättelse om en äventyrslysten katt.",
    max_tokens=100,  # Max antal ord i svaret
    n=1,  # Antal svar att generera
    stop=None,  # Använd om du vill stoppa genereringen på vissa ord eller meningar
    temperature=0.7  # Styr kreativiteten (0.0 till 1.0), där högre tal ger mer kreativa svar
)

# Skriver ut svaret från modellen
print(response.choices[0].text.strip())