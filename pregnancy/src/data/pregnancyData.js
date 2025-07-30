// Import images
import firstTrimesterImg from "../assets/first-trimester.png";
import secondTrimesterImg from "../assets/second-trimester.png";
import thirdTrimesterImg from "../assets/third-trimester.png";

/**
 * Pregnancy stages data
 */
export const pregnancyStages = [
  {
    id: 1,
    name: "First Trimester",
    weeks: "Weeks 1-12",
    image: firstTrimesterImg,
    color: "bg-pink-100",
    borderColor: "border-pink-400",
    textColor: "text-pink-800",
    description: "The first trimester is a time of rapid development for your baby and significant changes for you.",
    details: `The first trimester spans from week 1 through week 12 of pregnancy and is a critical period of development. During these initial weeks, your baby's major organs and body systems begin to form, including the brain, heart, and spinal cord. 

By week 8, your baby is called a fetus and is about the size of a kidney bean. By the end of the first trimester, your baby will be about 3 inches long and weigh around 1 ounce.

Common symptoms you might experience include:
• Morning sickness (nausea and vomiting)
• Extreme fatigue
• Frequent urination
• Tender, swollen breasts
• Food aversions or cravings
• Mood swings
• Heartburn and constipation

Important health considerations during this time:
• Begin taking prenatal vitamins with folic acid
• Avoid alcohol, tobacco, and certain medications
• Schedule your first prenatal appointment
• Consider genetic screening tests
• Maintain a balanced diet rich in fruits, vegetables, and proteins
• Stay hydrated and get plenty of rest

This is also the time when the risk of miscarriage is highest, so it's important to be aware of warning signs like severe cramping or bleeding and contact your healthcare provider immediately if you experience these symptoms.`,
    aiFeature: "AI Symptom Tracker: Monitor your first trimester symptoms and get personalized advice based on your specific needs."
  },
  {
    id: 2,
    name: "Second Trimester",
    weeks: "Weeks 13-27",
    image: secondTrimesterImg,
    color: "bg-purple-100",
    borderColor: "border-purple-400",
    textColor: "text-purple-800",
    description: "The second trimester is often called the 'golden period' of pregnancy as many uncomfortable symptoms subside.",
    details: `The second trimester covers weeks 13 through 27 and is often considered the most comfortable period of pregnancy. Many women experience a reduction in morning sickness and fatigue, while energy levels typically increase.

During this trimester, your baby grows substantially:
• By week 16, your baby's facial features become more defined
• Around week 18-22, you may feel your baby's first movements (quickening)
• By week 20, your baby is about 6-7 inches long and weighs about 10 ounces
• By the end of this trimester, your baby will be about 14 inches long and weigh around 2 pounds

Your body will undergo significant changes:
• Your abdomen will expand as your uterus grows
• You may notice a pregnancy "glow" due to increased blood circulation
• Skin changes like linea nigra (dark line down abdomen) may appear
• Hair and nails may grow faster
• Increased appetite as morning sickness subsides

Important health milestones:
• Anatomy scan ultrasound (around week 20) to check baby's development
• Glucose screening test for gestational diabetes
• Regular prenatal check-ups to monitor blood pressure and weight gain
• Consider starting prenatal classes
• Begin planning your birth preferences

This is also a good time to:
• Start preparing your home for the baby
• Consider your maternity leave options
• Begin sleeping on your side (preferably left) as your uterus grows
• Practice pelvic floor exercises
• Stay active with pregnancy-safe exercises like swimming or prenatal yoga`,
    aiFeature: "AI Nutrition Guide: Get personalized meal plans and nutrition advice tailored to your second trimester needs and preferences."
  },
  {
    id: 3,
    name: "Third Trimester",
    weeks: "Weeks 28-40+",
    image: thirdTrimesterImg,
    color: "bg-blue-100",
    borderColor: "border-blue-400",
    textColor: "text-blue-800",
    description: "The third trimester is the final stretch before meeting your baby, focusing on preparation and comfort.",
    details: `The third trimester spans from week 28 until birth (typically around week 40, though it can vary). This final stretch is characterized by significant growth of your baby and preparation for birth.

Your baby's development during this time:
• By week 32, your baby's bones are fully formed but still soft
• Around week 34, most babies turn head-down in preparation for birth
• By week 37, your baby is considered "full term"
• By the end of pregnancy, the average baby weighs 7-8 pounds and is 19-21 inches long
• Lungs and brain continue to mature throughout this trimester
• Baby develops sleep-wake cycles and may respond to sounds and light

Physical changes and symptoms you may experience:
• Shortness of breath as your uterus pushes against your diaphragm
• Braxton Hicks contractions (practice contractions)
• Swelling in feet and ankles
• Back pain and pelvic pressure
• Difficulty sleeping and increased fatigue
• Frequent urination as baby presses on your bladder
• Stretch marks and itchy skin as your belly expands

Important health considerations:
• Weekly prenatal appointments in the final month
• Group B strep test around week 36
• Monitor for signs of preeclampsia (high blood pressure, swelling, headaches)
• Be aware of signs of preterm labor
• Know the difference between Braxton Hicks and true labor contractions
• Pack your hospital bag by week 36
• Finalize your birth plan

Preparing for birth and beyond:
• Complete childbirth education classes
• Tour your birthing facility
• Install car seat and prepare nursery
• Consider breastfeeding classes if planning to breastfeed
• Arrange for help after baby arrives
• Rest as much as possible and practice relaxation techniques`,
    aiFeature: "AI Birth Plan Assistant: Create a personalized birth plan with AI guidance based on your preferences and medical considerations."
  }
];

export default pregnancyStages;