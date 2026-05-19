const axios = require('axios');
const Complaint = require('../models/Complaint');

// @desc    Analyze complaint using AI
// @route   POST /api/ai/analyze
// @access  Private
exports.analyzeComplaint = async (req, res) => {
  try {
    const { title, description, category, location, complaintId } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required for analysis' });
    }

    const prompt = `
      You are an AI assistant for a Smart Complaint Management System.
      Analyze the following complaint:
      Title: ${title}
      Description: ${description}
      Category: ${category}
      Location: ${location}
      
      Please provide a JSON response with the following keys:
      - "priority": Detect the urgency (Low, Medium, High, Critical)
      - "department": Recommend the responsible department
      - "summary": A brief 1-2 sentence summary of the complaint
      - "autoResponse": Generate an automatic, polite response message to the user
      
      Respond ONLY with valid JSON.
    `;

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'AI API Key is not configured' });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-pro', // Using gemini-pro through openrouter, but can be changed
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'AI Complaint System'
        },
      }
    );

    let aiResultText = response.data.choices[0].message.content;
    
    // Remove markdown code blocks if any
    aiResultText = aiResultText.replace(/```json/g, '').replace(/```/g, '').trim();

    const aiAnalysis = JSON.parse(aiResultText);

    // If complaintId is provided, update the complaint with AI analysis
    if (complaintId) {
      await Complaint.findByIdAndUpdate(complaintId, { aiAnalysis });
    }

    res.json(aiAnalysis);
  } catch (error) {
    console.error('AI Analysis Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to analyze complaint using AI', error: error.message });
  }
};
