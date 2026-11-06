import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Question {
  id: string;
  type: 'text' | 'date' | 'upload' | 'select' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
}

const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formTitle, setFormTitle] = useState('');
  
  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      type,
      label: `New ${type} question`,
      required: false,
    };
    
    if (type === 'select') {
      newQuestion.options = ['Option 1'];
    }
    
    setQuestions([...questions, newQuestion]);
  };
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setQuestions(items);
  };
  
  const handleSave = async () => {
    // Send to backend
    // await axios.post('/api/form_link/questionnaire', { title: formTitle, questions });
    console.log('Saving questionnaire:', { title: formTitle, questions });
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Form Title
        </label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter form title"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Questions</h3>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border p-4 rounded bg-gray-50"
                      >
                        <div className="flex justify-between mb-2">
                          <input
                            type="text"
                            value={question.label}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[index].label = e.target.value;
                              setQuestions(newQuestions);
                            }}
                            className="w-full p-1 border rounded"
                          />
                          <div className="flex items-center ml-3">
                            <label className="text-sm flex items-center">
                              <input
                                type="checkbox"
                                checked={question.required}
                                onChange={(e) => {
                                  const newQuestions = [...questions];
                                  newQuestions[index].required = e.target.checked;
                                  setQuestions(newQuestions);
                                }}
                                className="mr-1"
                              />
                              Required
                            </label>
                            <button 
                              onClick={() => {
                                setQuestions(questions.filter((_, i) => i !== index));
                              }}
                              className="ml-4 text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
      <div className="flex mb-6 space-x-2">
        <button 
          onClick={() => addQuestion('text')} 
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
        >
          + Text
        </button>
        <button 
          onClick={() => addQuestion('date')}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm" 
        >
          + Date
        </button>
        <button 
          onClick={() => addQuestion('select')}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
        >
          + Dropdown
        </button>
        <button 
          onClick={() => addQuestion('checkbox')}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
        >
          + Yes/No
        </button>
        <button 
          onClick={() => addQuestion('upload')}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm"
        >
          + File Upload
        </button>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Questionnaire
        </button>
      </div>
    </div>
  );
};

export default QuestionnaireForm;