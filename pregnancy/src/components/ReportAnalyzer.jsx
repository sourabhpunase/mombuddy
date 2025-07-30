import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Brain, AlertTriangle, CheckCircle, TrendingUp, Download, Eye } from 'lucide-react';

const ReportAnalyzer = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const aiModels = {
    bloodwork: 'LabAnalyzer-Maternal-v3.1',
    ultrasound: 'ImageAI-Fetal-v2.8',
    genetic: 'GenomeReader-Risk-v4.2',
    general: 'MedicalDoc-Parser-v2.5'
  };

  const supportedReports = [
    { type: 'Blood Work', icon: '🩸', description: 'CBC, metabolic panel, hormones' },
    { type: 'Ultrasound', icon: '📊', description: 'Fetal development scans' },
    { type: 'Genetic Tests', icon: '🧬', description: 'Carrier screening, NIPT' },
    { type: 'Urine Tests', icon: '🧪', description: 'Protein, glucose, infections' },
    { type: 'Thyroid Panel', icon: '⚡', description: 'TSH, T3, T4 levels' },
    { type: 'Glucose Test', icon: '🍯', description: 'Gestational diabetes screening' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'uploaded'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const analyzeReports = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = generateMockAnalysis();
      setAnalysisResults(mockAnalysis);
      setIsAnalyzing(false);
    }, 4000);
  };

  const generateMockAnalysis = () => {
    return {
      overall: {
        status: 'Good',
        riskLevel: 'Low',
        confidence: 94,
        summary: 'Your reports show healthy pregnancy progression with some areas for optimization.'
      },
      findings: [
        {
          category: 'Blood Work',
          status: 'normal',
          details: 'Hemoglobin: 12.1 g/dL (Normal), Iron: 85 μg/dL (Adequate)',
          recommendations: ['Continue iron supplementation', 'Monitor levels monthly'],
          priority: 'medium'
        },
        {
          category: 'Thyroid Function',
          status: 'attention',
          details: 'TSH: 3.2 mIU/L (Slightly elevated for pregnancy)',
          recommendations: ['Consult endocrinologist', 'Consider levothyroxine', 'Retest in 4 weeks'],
          priority: 'high'
        },
        {
          category: 'Glucose Screening',
          status: 'normal',
          details: '1-hour glucose: 128 mg/dL (Normal)',
          recommendations: ['Continue balanced diet', 'Regular exercise', 'Monitor carb intake'],
          priority: 'low'
        },
        {
          category: 'Ultrasound',
          status: 'excellent',
          details: 'Fetal growth: 50th percentile, All organs developing normally',
          recommendations: ['Continue current prenatal care', 'Next scan at 32 weeks'],
          priority: 'low'
        }
      ],
      trends: {
        improvement: ['Hemoglobin levels increased', 'Weight gain on track'],
        concerns: ['TSH trending upward', 'Blood pressure slightly elevated']
      },
      nextSteps: [
        'Schedule thyroid follow-up within 2 weeks',
        'Continue current supplement regimen',
        'Monitor blood pressure daily',
        'Maintain current exercise routine'
      ],
      aiInsights: {
        model: aiModels.bloodwork,
        confidence: 94,
        dataPoints: 47,
        comparisons: 'Compared against 50,000+ similar pregnancy profiles'
      }
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'attention': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'concern': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Report Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your medical reports and get instant AI-powered insights and personalized recommendations
          </p>
        </motion.div>

        {/* Supported Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Supported Report Types</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {supportedReports.map((report, index) => (
              <motion.div
                key={report.type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-2">{report.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{report.type}</h3>
                <p className="text-xs text-gray-600">{report.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <Upload className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Upload Reports</h2>
            </div>

            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Drag & drop your reports here
              </h3>
              <p className="text-gray-500 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-black px-6 py-3 rounded-xl cursor-pointer hover:shadow-lg transition-all"
              >
                Choose Files
              </label>
              <p className="text-xs text-gray-400 mt-2">
                Supports PDF, JPG, PNG, DOC files up to 10MB
              </p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-3">Uploaded Files</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-500 mr-2" />
                        <div>
                          <div className="font-medium text-gray-800">{file.name}</div>
                          <div className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <button
                onClick={analyzeReports}
                disabled={isAnalyzing}
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-black py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Analyzing Reports...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze with AI
                  </>
                )}
              </button>
            )}
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">AI Analysis</h2>
            </div>

            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 mb-2">AI analyzing your reports...</p>
                <div className="text-sm text-purple-600">
                  Processing with {Object.keys(aiModels).length} specialized models
                </div>
              </div>
            )}

            {analysisResults && !isAnalyzing && (
              <div className="space-y-6">
                {/* Overall Status */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Overall Assessment</h3>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-1" />
                      <span className="text-green-600 font-semibold">{analysisResults.overall.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{analysisResults.overall.summary}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>AI Confidence: {analysisResults.overall.confidence}%</span>
                  </div>
                </div>

                {/* Findings */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {analysisResults.findings.map((finding, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${getStatusColor(finding.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{finding.category}</h4>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(finding.priority)} mr-2`}></div>
                          <span className="text-xs uppercase font-semibold">{finding.priority}</span>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{finding.details}</p>
                      <div className="text-xs">
                        <strong>Recommendations:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {finding.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </button>
                  <button className="flex-1 border-2 border-purple-600 text-purple-600 py-3 rounded-xl hover:bg-purple-50 transition-all flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            )}

            {!analysisResults && !isAnalyzing && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Upload your medical reports to get AI-powered insights</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* AI Models Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-6"
        >
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">AI Models Powering Analysis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(aiModels).map(([key, model]) => (
              <div key={key} className="bg-white/50 rounded-xl p-3">
                <div className="text-sm font-semibold text-indigo-700 capitalize">{key}</div>
                <div className="text-xs text-gray-600 font-mono">{model}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportAnalyzer;