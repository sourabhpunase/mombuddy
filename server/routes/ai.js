import express from 'express';
const router = express.Router();

// Specialized AI responses based on pregnancy stage and model
const generateAIResponse = (message, context = {}, model = 'llama-pregnancy-general') => {
  const lowerMessage = message.toLowerCase();
  
  // Use specialized responses based on model/stage
  if (model.includes('preconception') || context.stage === 'pre-conception') {
    return generatePreConceptionResponse(message, context);
  }
  if (model.includes('fertility') || context.stage === 'fertility') {
    return generateFertilityResponse(message, context);
  }
  if (model.includes('first-trimester') || (context.week && context.week <= 12)) {
    return generateFirstTrimesterResponse(message, context);
  }
  if (model.includes('second-trimester') || (context.week && context.week <= 27)) {
    return generateSecondTrimesterResponse(message, context);
  }
  if (model.includes('third-trimester') || (context.week && context.week <= 40)) {
    return generateThirdTrimesterResponse(message, context);
  }
  
  // General pregnancy responses
  const responses = {
    'hello': "Hello! I'm your comprehensive pregnancy planning AI assistant with specialized models for every stage of your journey.",
    
    'symptoms': `**General Pregnancy Symptoms Guide:**

**First Trimester (1-12 weeks):**
• Morning sickness (70-80% of women)
• Extreme fatigue
• Breast tenderness
• Frequent urination
• Food aversions/cravings

**Second Trimester (13-27 weeks):**
• Reduced nausea
• Increased energy
• Baby movements
• Round ligament pain
• Heartburn

**Third Trimester (28-40 weeks):**
• Shortness of breath
• Back pain
• Swelling
• Braxton Hicks contractions
• Sleep difficulties

**Emergency Signs - Call Doctor:**
• Severe abdominal pain
• Heavy bleeding
• Severe headaches with vision changes
• Decreased fetal movement (after 28 weeks)`,

    'nutrition': `**Comprehensive Pregnancy Nutrition:**

**Pre-Conception (3-6 months before):**
• Folic acid 800mcg daily
• Maintain healthy BMI (18.5-24.9)
• Limit alcohol, quit smoking
• Balanced diet with variety

**First Trimester:**
• Continue folic acid
• Focus on preventing nausea
• Small, frequent meals
• Avoid raw foods, high-mercury fish

**Second Trimester:**
• Increase iron intake (27mg daily)
• Add DHA for brain development
• Increase calories by 300-500
• Focus on calcium and protein

**Third Trimester:**
• Maintain protein intake
• Prepare for breastfeeding nutrition
• Stay hydrated
• Limit large meals`,

    'exercise': `**Exercise Throughout Pregnancy:**

**Pre-Conception:**
• Establish regular exercise routine
• Achieve healthy weight
• Build cardiovascular fitness
• Strengthen core muscles

**Pregnancy Exercise Guidelines:**
• 150 minutes moderate exercise weekly
• Avoid overheating and dehydration
• Stop if experiencing pain or dizziness
• Modify as pregnancy progresses

**Safe Exercises:**
• Walking (all stages)
• Swimming (excellent full-body)
• Prenatal yoga
• Light strength training
• Stationary cycling

**Avoid:**
• Contact sports
• Activities with fall risk
• Lying flat on back (after first trimester)
• Scuba diving`,

    'default': `I'm your comprehensive pregnancy planning assistant with specialized knowledge for every stage:

**Specialized AI Models Available:**
• Pre-Conception Planning Specialist
• Fertility Optimization Expert  
• First Trimester Care Specialist
• Second Trimester Growth Expert
• Third Trimester Birth Prep Specialist

**Important Note:**
I provide evidence-based information but am not a replacement for professional medical care. Always consult your healthcare provider for personalized advice.

What stage of your pregnancy journey would you like specialized guidance on?`
  };

  // Find matching response
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
};

// Pre-conception specialist responses
const generatePreConceptionResponse = (message, context) => {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    'folic': `**Folic Acid - Critical for Pre-Conception:**

**Why Start Early:**
• Prevents 70% of neural tube defects
• Neural tube closes by day 28 (often before you know you're pregnant)
• Takes 3 months to build optimal levels

**Dosage:**
• 800mcg daily (higher than general population)
• Start 3 months before trying to conceive
• Continue through first trimester

**Best Sources:**
• Prenatal vitamins (most reliable)
• Fortified cereals and grains
• Leafy greens (spinach, kale)
• Citrus fruits
• Legumes and beans

**Special Cases:**
• History of neural tube defects: 4000mcg daily
• Diabetes or epilepsy: Higher doses needed
• Always consult your doctor for personalized dosing`,

    'health': `**Pre-Conception Health Screening:**

**Essential Tests:**
• Complete blood count (check for anemia)
• Thyroid function (TSH, T4)
• Blood sugar/diabetes screening
• STD screening (both partners)
• Rubella immunity
• Genetic carrier screening

**Vaccinations to Update:**
• MMR (measles, mumps, rubella)
• Varicella (chickenpox)
• Tdap (tetanus, diphtheria, pertussis)
• Flu vaccine (safe during pregnancy)
• COVID-19 vaccine

**Chronic Conditions:**
• Optimize diabetes control (HbA1c <7%)
• Adjust medications for pregnancy safety
• Manage hypertension
• Address thyroid disorders

**Timeline:**
Schedule appointment 3-6 months before trying to conceive`,

    'lifestyle': `**Lifestyle Optimization for Conception:**

**Weight Management:**
• Achieve BMI 18.5-24.9 for optimal fertility
• Underweight: May affect ovulation
• Overweight: Increases pregnancy complications
• Gradual weight loss if needed (1-2 lbs/week)

**Nutrition:**
• Mediterranean-style diet
• Limit processed foods
• Reduce trans fats
• Increase antioxidant-rich foods
• Stay hydrated (8-10 glasses daily)

**Substances to Avoid:**
• Alcohol (completely eliminate)
• Smoking (both partners quit)
• Recreational drugs
• Limit caffeine (<200mg daily)
• Avoid high-mercury fish

**Stress Management:**
• Practice relaxation techniques
• Regular exercise
• Adequate sleep (7-9 hours)
• Consider counseling if needed

**Environmental Factors:**
• Avoid toxic chemicals
• Use natural cleaning products
• Limit exposure to pesticides`,

    'default': `**Pre-Conception Planning Specialist**

I'm specialized in helping couples prepare for healthy pregnancy. Key areas I can help with:

**3-6 Months Before Conception:**
• Folic acid supplementation (800mcg daily)
• Pre-conception health screening
• Lifestyle optimization
• Weight management
• Vaccination updates

**Fertility Preparation:**
• Menstrual cycle tracking
• Ovulation prediction
• Optimal timing for conception
• Partner health considerations

**Risk Reduction:**
• Genetic counseling if needed
• Medication safety review
• Environmental toxin avoidance
• Chronic disease management

What specific aspect of pre-conception planning would you like guidance on?`
  };

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
};

// Fertility specialist responses
const generateFertilityResponse = (message, context) => {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    'ovulation': `**Ovulation Tracking & Optimization:**

**Signs of Ovulation:**
• Cervical mucus becomes clear and stretchy (egg-white consistency)
• Basal body temperature rises 0.5-1°F after ovulation
• Ovulation pain (mittelschmerz) on one side
• Increased libido
• Cervix becomes softer and higher

**Tracking Methods:**
• Basal Body Temperature (BBT) - most accurate
• Cervical mucus monitoring
• Ovulation predictor kits (OPKs)
• Fertility apps with data input
• Cervical position tracking

**Optimal Timing:**
• Fertile window: 5 days before + day of ovulation
• Sperm survives 3-5 days in female reproductive tract
• Egg survives 12-24 hours after ovulation
• Have intercourse every other day during fertile window

**Cycle Length Variations:**
• 28-day cycle: Ovulation around day 14
• Shorter cycles: Earlier ovulation
• Longer cycles: Later ovulation
• Track for 3+ months for patterns`,

    'timing': `**Perfect Conception Timing:**

**Fertile Window Strategy:**
• Start intercourse 5 days before predicted ovulation
• Continue through 1 day after ovulation
• Every other day frequency is optimal
• Daily intercourse can decrease sperm quality

**Best Times for Intercourse:**
• Morning (highest sperm count)
• When cervical mucus is most fertile
• During LH surge (positive OPK)
• When you feel most relaxed

**Sperm Optimization:**
• Male partner: Avoid hot baths/saunas
• Wear loose-fitting underwear
• Limit alcohol and smoking
• Maintain healthy weight
• Take antioxidants (Vitamin C, E, Zinc)

**Position & Aftercare:**
• Any position works - gravity doesn't affect conception
• Stay lying down 10-15 minutes after (optional)
• Avoid douching or immediate bathing
• Focus on relaxation and intimacy`,

    'cycle': `**Menstrual Cycle Optimization:**

**Normal Cycle Characteristics:**
• Length: 21-35 days (average 28)
• Menstrual flow: 3-7 days
• Ovulation: 12-16 days before next period
• Luteal phase: 10-16 days (should be consistent)

**Cycle Irregularities:**
• Stress can delay ovulation
• Weight changes affect hormones
• Thyroid disorders impact cycles
• PCOS causes irregular ovulation

**Improving Cycle Health:**
• Maintain stable weight
• Regular exercise (not excessive)
• Manage stress levels
• Adequate sleep (7-9 hours)
• Balanced nutrition
• Limit caffeine and alcohol

**When to Seek Help:**
• Trying for 12+ months (under 35)
• Trying for 6+ months (over 35)
• Irregular or absent periods
• Known fertility issues
• Recurrent pregnancy loss`,

    'default': `**Fertility Optimization Specialist**

I help maximize your chances of conception through:

**Ovulation Tracking:**
• BBT charting and analysis
• Cervical mucus interpretation
• OPK timing and usage
• Fertile window identification

**Cycle Optimization:**
• Menstrual cycle analysis
• Hormonal balance support
• Lifestyle factors affecting fertility
• Timing strategies for conception

**Both Partners:**
• Male fertility optimization
• Lifestyle modifications
• Nutritional support
• Stress management techniques

**When to Seek Medical Help:**
• Age-based timelines for evaluation
• Warning signs requiring attention
• Fertility testing recommendations

What aspect of fertility optimization would you like to focus on?`
  };

  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
};

// First trimester specialist responses
const generateFirstTrimesterResponse = (message, context) => {
  const week = context.week || 8;
  
  return `**First Trimester Specialist - Week ${week}:**

**Critical Focus: Foundation & Development**

**Essential Supplements:**
• Folic acid 800mcg daily (CRITICAL - prevents neural tube defects)
• Prenatal vitamin with iron
• Vitamin D 1000-2000 IU
• Continue until at least week 12

**Nutrition Priorities:**
• Small, frequent meals (combat nausea)
• Ginger for morning sickness
• Bland foods: crackers, toast, rice
• Stay hydrated - sip fluids throughout day
• Avoid: raw fish, deli meats, unpasteurized dairy

**Common Symptoms (Normal):**
• Morning sickness (peaks weeks 8-10)
• Extreme fatigue
• Breast tenderness
• Frequent urination
• Food aversions

**Exercise Guidelines:**
• Continue pre-pregnancy routine if comfortable
• Avoid overheating
• Stay hydrated
• Listen to your body - rest when needed

**Warning Signs - Call Doctor:**
• Severe vomiting (can't keep fluids down)
• Severe abdominal pain
• Heavy bleeding with clots
• Severe headaches
• High fever

**Week ${week} Specific:**
${week <= 6 ? 'Heart begins beating, neural tube forming - folic acid is CRITICAL' :
  week <= 10 ? 'All major organs developing, morning sickness likely at peak' :
  'End of first trimester approaching, energy may start returning'}

What specific first trimester concern can I help you with?`;
};

// Second trimester specialist responses  
const generateSecondTrimesterResponse = (message, context) => {
  const week = context.week || 20;
  
  return `**Second Trimester Specialist - Week ${week}:**

**Focus: Growth & Energy Return**

**Essential Supplements:**
• Iron 27mg daily (prevent anemia)
• Calcium 1000mg daily (bone development)
• DHA 200-300mg (brain development)
• Continue prenatal vitamin

**Nutrition Priorities:**
• Increase calories by 300-500 daily
• Focus on protein (75-100g daily)
• Iron-rich foods: lean meat, spinach, beans
• Calcium sources: dairy, fortified foods
• Healthy fats for brain development

**Common Changes:**
• Energy returns (golden period!)
• Baby movements felt (quickening)
• Belly growth becomes noticeable
• Possible heartburn, constipation
• Round ligament pain

**Exercise Recommendations:**
• Moderate cardio: walking, swimming
• Prenatal yoga
• Light strength training
• Avoid lying flat on back
• Stay hydrated and cool

**Important Screenings:**
• Anatomy scan (18-22 weeks)
• Glucose screening (24-28 weeks)
• Blood pressure monitoring
• Weight gain assessment

**Week ${week} Specific:**
${week <= 16 ? 'Baby can hear sounds, sex organs visible on ultrasound' :
  week <= 20 ? 'Halfway point! Anatomy scan time' :
  week <= 24 ? 'Viability milestone, glucose screening due' :
  'Preparing for third trimester, baby movements regular'}

**Warning Signs:**
• No fetal movement for 24+ hours
• Severe headaches with vision changes
• Signs of preterm labor
• Unusual vaginal discharge

What second trimester question can I help you with?`;
};

// Third trimester specialist responses
const generateThirdTrimesterResponse = (message, context) => {
  const week = context.week || 32;
  
  return `**Third Trimester Specialist - Week ${week}:**

**Focus: Birth Preparation & Final Growth**

**Essential Supplements:**
• Continue prenatal vitamin
• Vitamin K (supports blood clotting)
• Probiotics (may reduce GBS risk)
• Omega-3 for brain development

**Nutrition Focus:**
• Protein for rapid growth
• Small, frequent meals (limited stomach space)
• High-fiber foods (prevent constipation)
• Stay hydrated
• Limit large meals before bed

**Common Symptoms:**
• Shortness of breath
• Back pain, pelvic pressure
• Braxton Hicks contractions
• Swelling in feet/ankles
• Sleep difficulties
• Frequent urination returns

**Birth Preparation:**
• Finalize birth plan
• Pack hospital bag (by week 36)
• Choose pediatrician
• Take childbirth classes
• Practice breathing exercises

**Exercise & Comfort:**
• Gentle walking
• Prenatal yoga
• Pelvic tilts for back pain
• Sleep on side with pillow support
• Warm baths for comfort

**Week ${week} Monitoring:**
${week <= 32 ? 'Rapid brain development, bones hardening' :
  week <= 36 ? 'Lungs maturing, weekly checkups begin' :
  'Full-term approaching, monitor for labor signs'}

**Labor Signs to Watch:**
• Regular contractions (5-1-1 rule)
• Water breaking
• Bloody show
• Severe back pain
• Decreased fetal movement

**Emergency Signs:**
• Severe headaches with vision changes
• Sudden severe swelling
• Persistent abdominal pain
• Heavy bleeding

What third trimester concern can I address for you?`;
};

// Main AI chat endpoint with specialized models
router.post('/', async (req, res) => {
  try {
    const { message, context, model } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate AI response with specialized model
    const response = generateAIResponse(message, context, model);
    
    res.json({
      response,
      timestamp: new Date().toISOString(),
      model: model || 'llama-pregnancy-general',
      stage: context?.stage || 'general'
    });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      error: 'AI service temporarily unavailable',
      fallback: "I'm here to help with your pregnancy questions. Could you please rephrase your question?"
    });
  }
});

// Symptom analysis endpoint
router.post('/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;
    const analysis = analyzeSymptoms(symptoms);
    res.json(analysis);
  } catch (error) {
    console.error('Symptom Analysis Error:', error);
    res.status(500).json({ error: 'Symptom analysis unavailable' });
  }
});

// Nutrition advice endpoint
router.post('/nutrition', async (req, res) => {
  try {
    const { trimester, preferences } = req.body;
    const nutritionAdvice = getNutritionAdvice(trimester, preferences);
    res.json(nutritionAdvice);
  } catch (error) {
    console.error('Nutrition Service Error:', error);
    res.status(500).json({ error: 'Nutrition service unavailable' });
  }
});

// Helper functions
const analyzeSymptoms = (symptoms) => {
  const commonSymptoms = ['nausea', 'fatigue', 'breast tenderness', 'frequent urination'];
  const concerningSymptoms = ['severe pain', 'heavy bleeding', 'severe headache'];
  
  let urgency = 'low';
  let analysis = 'Your symptoms appear to be within normal pregnancy ranges.';
  let recommendations = [
    'Monitor symptoms and note any changes',
    'Stay hydrated and get adequate rest',
    'Continue prenatal vitamins'
  ];
  
  const hasConceringSymptoms = symptoms.some(symptom => 
    concerningSymptoms.some(concerning => 
      symptom.name.toLowerCase().includes(concerning)
    )
  );
  
  if (hasConceringSymptoms) {
    urgency = 'high';
    analysis = 'Some of your symptoms may require immediate medical attention.';
    recommendations = [
      'Contact your healthcare provider immediately',
      'Do not wait for your next appointment',
      'Go to emergency room if symptoms worsen'
    ];
  }
  
  return { analysis, recommendations, urgency };
};

const getNutritionAdvice = (trimester, preferences) => {
  const nutritionPlans = {
    1: {
      focus: 'Folate, managing nausea',
      keyNutrients: ['Folate', 'Vitamin B6', 'Iron'],
      recommendedFoods: ['Leafy greens', 'Citrus fruits', 'Whole grains', 'Lean proteins'],
      avoidFoods: ['Raw fish', 'Unpasteurized dairy', 'High mercury fish'],
      tips: ['Eat small frequent meals', 'Try ginger for nausea', 'Stay hydrated']
    },
    2: {
      focus: 'Iron, calcium, protein for growth',
      keyNutrients: ['Iron', 'Calcium', 'Protein', 'DHA'],
      recommendedFoods: ['Red meat', 'Dairy products', 'Fish', 'Nuts', 'Legumes'],
      avoidFoods: ['Deli meats', 'Raw eggs', 'Excessive caffeine'],
      tips: ['Increase calorie intake by 300-500', 'Take prenatal vitamins', 'Eat regular meals']
    },
    3: {
      focus: 'Healthy weight gain, preparing for breastfeeding',
      keyNutrients: ['Protein', 'Healthy fats', 'Fiber', 'Calcium'],
      recommendedFoods: ['Complex carbs', 'Healthy fats', 'Protein', 'Fiber-rich foods'],
      avoidFoods: ['Processed foods', 'Excess sugar', 'Large meals'],
      tips: ['Eat smaller portions more frequently', 'Focus on nutrient-dense foods', 'Stay active']
    }
  };
  
  return nutritionPlans[trimester] || nutritionPlans[2];
};

export default router;