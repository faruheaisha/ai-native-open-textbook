---
title: "AI Agents for Beginners（微软官方入门课）"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/09-metacognition/README.md"
sourceRel: "09-metacognition/README.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/09-metacognition/README.md"
sourceSha256: "d7e98597881e26052c8694c111bd8d03d41c8f982c039a501a9dd5f05a1f8e18"
pageSha256: "e3e47ccc838101c78a5f1508a0ec1bbeb9f7b313eaee2fc842e9ddf563383239"
contentMode: "local-full"
zh: ""
---

## Components of an AI Agent

Before diving into metacognitive processes, it's essential to understand the basic components of an AI agent. An AI agent typically consists of:

- Persona: The personality and characteristics of the agent, which define how it interacts with users.
- Tools: The capabilities and functions that the agent can perform.
- Skills: The knowledge and expertise that the agent possesses.

These components work together to create an "expertise unit" that can perform specific tasks.

**Example**:
Consider a travel agent, agent services that not only plans your holiday but also adjusts its path based on real-time data and past customer journey experiences.

### Example: Metacognition in a Travel Agent Service

Imagine you're designing a travel agent service powered by AI. This agent, "Travel Agent," assists users with planning their vacations. To incorporate metacognition, Travel Agents needs to evaluate and adjust its actions based on self-awareness and past experiences. Here's how metacognition could play a role:

#### Current Task

The current task is to help a user plan a trip to Paris.

#### Steps to Complete the Task

1. **Gather User Preferences**: Ask the user about their travel dates, budget, interests (e.g., museums, cuisine, shopping), and any specific requirements.
2. **Retrieve Information**: Search for flight options, accommodations, attractions, and restaurants that match the user's preferences.
3. **Generate Recommendations**: Provide a personalized itinerary with flight details, hotel reservations, and suggested activities.
4. **Adjust Based on Feedback**: Ask the user for feedback on the recommendations and make necessary adjustments.

#### Required Resources

- Access to flight and hotel booking databases.
- Information on Parisian attractions and restaurants.
- User feedback data from previous interactions.

#### Experience and Self-Reflection

Travel Agent uses metacognition to evaluate its performance and learn from past experiences. For example:

1. **Analyzing User Feedback**: Travel Agent reviews user feedback to determine which recommendations were well-received and which were not. It adjusts its future suggestions accordingly.
2. **Adaptability**: If a user has previously mentioned a dislike for crowded places, Travel Agent will avoid recommending popular tourist spots during peak hours in the future.
3. **Error Correction**: If Travel Agent made an error in a past booking, such as suggesting a hotel that was fully booked, it learns to check availability more rigorously before making recommendations.

#### Practical Developer Example

Here's a simplified example of how Travel Agents code might look when incorporating metacognition:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Search for flights, hotels, and attractions based on preferences
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # Analyze feedback and adjust future recommendations
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Example usage
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### Why Metacognition Matters

- **Self-Reflection**: Agents can analyze their performance and identify areas for improvement.
- **Adaptability**: Agents can modify strategies based on feedback and changing conditions.
- **Error Correction**: Agents can autonomously detect and correct mistakes.
- **Resource Management**: Agents can optimize resource usage, such as time and computational power.

By incorporating metacognition, Travel Agent can provide more personalized and accurate travel recommendations, enhancing the overall user experience.
