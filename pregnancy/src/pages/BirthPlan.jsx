import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Save } from 'lucide-react';

const BirthPlan = () => {
  const [birthPlan, setBirthPlan] = useState({
    birthLocation: '',
    painManagement: '',
    laborSupport: '',
    deliveryPosition: '',
    cuttingCord: '',
    skinToSkin: true,
    breastfeeding: true,
    visitors: '',
    specialRequests: ''
  });

  const options = {
    birthLocation: ['Hospital', 'Birth Center', 'Home Birth'],
    painManagement: ['Natural', 'Epidural', 'Nitrous Oxide', 'Water Birth'],
    laborSupport: ['Partner Only', 'Doula', 'Family Members', 'Medical Team Only'],
    deliveryPosition: ['On Back', 'Side-lying', 'Squatting', 'Water Birth'],
    cuttingCord: ['Partner', 'Doctor', 'Delayed Clamping']
  };

  const handleChange = (field, value) => {
    setBirthPlan(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Birth Plan Creator
        </motion.h1>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-pink-600 mr-2" />
            <h2 className="text-2xl font-semibold">Create Your Birth Plan</h2>
          </div>

          <div className="space-y-6">
            {/* Birth Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Birth Location</label>
              <div className="grid grid-cols-3 gap-4">
                {options.birthLocation.map(option => (
                  <button
                    key={option}
                    onClick={() => handleChange('birthLocation', option)}
                    className={`p-3 rounded-lg border transition-all ${
                      birthPlan.birthLocation === option
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Pain Management */}
            <div>
              <label className="block text-sm font-medium mb-2">Pain Management Preference</label>
              <div className="grid grid-cols-2 gap-4">
                {options.painManagement.map(option => (
                  <button
                    key={option}
                    onClick={() => handleChange('painManagement', option)}
                    className={`p-3 rounded-lg border transition-all ${
                      birthPlan.painManagement === option
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Labor Support */}
            <div>
              <label className="block text-sm font-medium mb-2">Labor Support Team</label>
              <div className="grid grid-cols-2 gap-4">
                {options.laborSupport.map(option => (
                  <button
                    key={option}
                    onClick={() => handleChange('laborSupport', option)}
                    className={`p-3 rounded-lg border transition-all ${
                      birthPlan.laborSupport === option
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Position */}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Delivery Position</label>
              <div className="grid grid-cols-2 gap-4">
                {options.deliveryPosition.map(option => (
                  <button
                    key={option}
                    onClick={() => handleChange('deliveryPosition', option)}
                    className={`p-3 rounded-lg border transition-all ${
                      birthPlan.deliveryPosition === option
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={birthPlan.skinToSkin}
                    onChange={(e) => handleChange('skinToSkin', e.target.checked)}
                    className="mr-2 w-4 h-4 text-pink-600"
                  />
                  Immediate skin-to-skin contact
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={birthPlan.breastfeeding}
                    onChange={(e) => handleChange('breastfeeding', e.target.checked)}
                    className="mr-2 w-4 h-4 text-pink-600"
                  />
                  Breastfeeding within first hour
                </label>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium mb-2">Special Requests or Notes</label>
              <textarea
                value={birthPlan.specialRequests}
                onChange={(e) => handleChange('specialRequests', e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Any additional preferences or special requests..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center">
                <Save className="w-5 h-5 mr-2" />
                Save Birth Plan
              </button>
              <button className="flex-1 border-2 border-pink-600 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition-all flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Birth Plan Preview */}
        {Object.values(birthPlan).some(value => value) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Your Birth Plan Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {birthPlan.birthLocation && <p><strong>Birth Location:</strong> {birthPlan.birthLocation}</p>}
              {birthPlan.painManagement && <p><strong>Pain Management:</strong> {birthPlan.painManagement}</p>}
              {birthPlan.laborSupport && <p><strong>Labor Support:</strong> {birthPlan.laborSupport}</p>}
              {birthPlan.deliveryPosition && <p><strong>Delivery Position:</strong> {birthPlan.deliveryPosition}</p>}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BirthPlan;