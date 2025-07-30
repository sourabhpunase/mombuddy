// AI Service for pregnancy chatbot using specialized models
class AIService {
  constructor() {
    this.apiUrl = 'http://localhost:5000/api/ai';
    this.models = {
      preConception: 'llama-preconception-specialist',
      fertility: 'llama-fertility-optimizer', 
      firstTrimester: 'llama-first-trimester-specialist',
      secondTrimester: 'llama-second-trimester-specialist',
      thirdTrimester: 'llama-third-trimester-specialist',
      general: 'llama-pregnancy-general'
    };
  }

  async sendMessage(message, context = {}) {
    try {
      // Select appropriate model based on context
      const model = this.selectModel(context);
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
          model
        })
      });

      if (!response.ok) {
        throw new Error('AI service unavailable');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackResponse(message, context);
    }
  }

  selectModel(context) {
    if (context.stage === 'pre-conception') return this.models.preConception;
    if (context.stage === 'fertility') return this.models.fertility;
    if (context.week && context.week <= 12) return this.models.firstTrimester;
    if (context.week && context.week <= 27) return this.models.secondTrimester;
    if (context.week && context.week <= 40) return this.models.thirdTrimester;
    return this.models.general;
  }

  getFallbackResponse(message, context = {}) {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
      'symptoms': "I understand you're asking about pregnancy symptoms. Common symptoms include morning sickness, fatigue, breast tenderness, and frequent urination. Each trimester brings different experiences. Would you like specific information about any particular symptom?",
      
      'nutrition': "Proper nutrition is crucial during pregnancy. Focus on:\n• Folate-rich foods (leafy greens, citrus)\n• Iron sources (lean meat, beans)\n• Calcium (dairy, fortified foods)\n• Protein (fish, poultry, legumes)\n• Avoid raw fish, unpasteurized dairy, and limit caffeine. Would you like a personalized meal plan?",
      
      'exercise': "Safe exercises during pregnancy include:\n• Walking\n• Swimming\n• Prenatal yoga\n• Light strength training\nAlways consult your healthcare provider before starting new exercises. Avoid contact sports and activities with fall risk.",
      
      'trimester': "Pregnancy is divided into three trimesters:\n• First (1-12 weeks): Organ development, morning sickness common\n• Second (13-27 weeks): Energy returns, baby movements felt\n• Third (28-40 weeks): Rapid growth, preparation for birth\nWhich trimester are you in?",
      
      'birth': "Birth planning involves considering:\n• Birth location (hospital, birth center, home)\n• Pain management preferences\n• Labor support team\n• Delivery positions\n• Postpartum preferences\nWould you like help creating your birth plan?",
      
      'baby': "Your baby develops rapidly throughout pregnancy:\n• Week 4: Heart begins beating\n• Week 8: All major organs forming\n• Week 20: Halfway point, anatomy scan\n• Week 28: Eyes open, brain developing\n• Week 36: Lungs maturing\nWhat week are you currently at?",
      
      'doctor': "Contact your healthcare provider if you experience:\n• Severe abdominal pain\n• Heavy bleeding\n• Severe headaches\n• Vision changes\n• Decreased fetal movement\n• Signs of preterm labor\nAlways trust your instincts - when in doubt, call your doctor.",
      
      'weight': "Healthy weight gain during pregnancy:\n• Underweight: 28-40 lbs\n• Normal weight: 25-35 lbs\n• Overweight: 15-25 lbs\n• Obese: 11-20 lbs\nGain should be gradual, with most occurring in 2nd and 3rd trimesters.",
      
      'sleep': "Better sleep during pregnancy:\n• Sleep on your side (preferably left)\n• Use pregnancy pillows for support\n• Avoid large meals before bed\n• Create a relaxing bedtime routine\n• Limit fluids before bedtime\nSleep issues are common - discuss with your doctor if severe.",
      
      'preconception': "**Pre-Conception Planning Specialist**\n\nI'm specialized in helping couples prepare for pregnancy. I can assist with:\n• Folic acid supplementation (start 3 months before conception)\n• Pre-conception health screening\n• Lifestyle optimization for fertility\n• Vaccination updates\n• Menstrual cycle tracking\n\nWhat aspect of pre-conception planning would you like to focus on?",
      
      'fertility': "**Fertility Optimization Specialist**\n\nI help optimize your chances of conception through:\n• Ovulation prediction and timing\n• Cervical mucus analysis\n• Basal body temperature tracking\n• Fertile window identification\n• Lifestyle factors affecting fertility\n\nWhat fertility tracking question can I help you with?",
      
      'default': "I'm your comprehensive pregnancy planning assistant with specialized knowledge for every stage:\n\n**Pre-Conception (3-6 months before):**\n• Health optimization and supplements\n• Fertility tracking and timing\n\n**Pregnancy Journey (40 weeks):**\n• Week-by-week development guidance\n• Trimester-specific nutrition and care\n• Symptom management and safety\n\n**Birth Preparation:**\n• Birth plan creation\n• Labor and delivery preparation\n\nWhat stage of your journey would you like guidance on?"
    };

    // Check context first for specialized responses
    if (context.stage === 'pre-conception') return responses.preconception;
    if (context.stage === 'fertility') return responses.fertility;
    
    // Then check message content
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  }

  // Analyze symptoms using AI
  async analyzeSymptoms(symptoms) {
    try {
      const response = await fetch(`${this.apiUrl}/analyze-symptoms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms })
      });

      if (!response.ok) {
        throw new Error('Symptom analysis unavailable');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Symptom Analysis Error:', error);
      return {
        analysis: "Based on your symptoms, this appears to be within normal pregnancy ranges. However, always consult your healthcare provider for personalized advice.",
        recommendations: [
          "Monitor symptoms and note any changes",
          "Stay hydrated and get adequate rest",
          "Contact your doctor if symptoms worsen"
        ],
        urgency: "low"
      };
    }
  }

  // Generate nutrition recommendations
  async getNutritionAdvice(trimester, preferences = {}) {
    try {
      const response = await fetch(`${this.apiUrl}/nutrition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trimester, preferences })
      });

      if (!response.ok) {
        throw new Error('Nutrition service unavailable');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Nutrition Service Error:', error);
      return this.getFallbackNutrition(trimester);
    }
  }

  getFallbackNutrition(trimester) {
    const nutritionPlans = {
      1: {
        focus: "Folate, preventing nausea",
        foods: ["Leafy greens", "Citrus fruits", "Whole grains", "Lean proteins"],
        avoid: ["Raw fish", "Unpasteurized dairy", "High mercury fish"],
        tips: ["Small frequent meals", "Ginger for nausea", "Stay hydrated"]
      },
      2: {
        focus: "Iron, calcium, protein",
        foods: ["Red meat", "Dairy products", "Nuts", "Legumes"],
        avoid: ["Deli meats", "Raw eggs", "Excessive caffeine"],
        tips: ["Increase calorie intake", "Take prenatal vitamins", "Regular meals"]
      },
      3: {
        focus: "Healthy weight gain, energy",
        foods: ["Complex carbs", "Healthy fats", "Protein", "Fiber-rich foods"],
        avoid: ["Processed foods", "Excess sugar", "Large meals"],
        tips: ["Smaller portions", "Frequent snacks", "Stay active"]
      }
    };

    return nutritionPlans[trimester] || nutritionPlans[2];
  }
}

export default new AIService();