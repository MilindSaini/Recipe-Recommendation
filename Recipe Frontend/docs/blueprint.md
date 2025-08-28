# **App Name**: Dishcovery

## Core Features:

- Ingredient Input: Allow users to input available ingredients via text input or selection from a list, and to specify dietary preferences.
- AI Recipe Generation: Use a generative AI tool to formulate new recipes based on provided ingredients, including detailed instructions and nutritional info.
- Recipe Filters and Customization: Filter recipes by difficulty, cooking time, or dietary restrictions. Adjust serving sizes as desired.
- Substitution suggestions: Offer ingredient substitutions to accomodate dietary restrictions and match available ingredients. If the algorithm cannot automatically choose good subsitutions, it will use a tool to incorporate reasonable options.
- User Authentication: Create a LogIn/SignUp through DB in mongoDB with username and password functionality
- Edamam API: Use edamam api for recipes
- Backend Implementation: Use proper Rest Api for response for login functionality and Edamam API for securly storing and giving JSON response in frontend . After Login he can input ingredients.

## Style Guidelines:

- Primary color: Saturated crimson (#DC143C) for a bold, appetite-inducing feel.
- Background color: Light rose (#F8E8E8) provides a soft, neutral backdrop that won't overwhelm the food imagery.
- Accent color: Complementary orange (#FF8C00) to highlight key interactive elements.
- Headline font: 'Belleza' (sans-serif) for headlines and shorter text, reflecting art and design aesthetics.
- Body font: 'Alegreya' (serif) for recipe descriptions and nutritional info, ensures readability.
- Use minimalist icons to represent dietary preferences (e.g., vegetarian, gluten-free) and cooking times.
- Clean, intuitive layout with a focus on showcasing recipe images. Mobile-responsive design for access on any device. Use only ReactJs for UI and Tailwind Wind CSS