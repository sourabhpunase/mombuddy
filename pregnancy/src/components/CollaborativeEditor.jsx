import React, { useState } from 'react';
import { RealtimeEditor } from 'sourabhrealtime';
import 'sourabhrealtime/dist/RealtimeEditor.css';

function CollaborativeEditor() {
  const [content, setContent] = useState('Start typing here...');
  
  // Generate a random user ID or use from localStorage if exists
  const userId = localStorage.getItem('editorUserId') || `user-${Math.floor(Math.random() * 10000)}`;
  
  // Save user ID to localStorage for persistence
  if (!localStorage.getItem('editorUserId')) {
    localStorage.setItem('editorUserId', userId);
  }
  
  return (
    <div className="collaborative-editor">
      <h2 className="text-xl font-bold mb-4">Collaborative Editor</h2>
      <RealtimeEditor
        apiUrl="http://localhost:3002"
        projectId="pregnancy-app"
        userId={userId}
        userName={`User ${userId.split('-')[1]}`}
        initialContent={content}
        onContentChange={setContent}
      />
    </div>
  );
}

export default CollaborativeEditor;