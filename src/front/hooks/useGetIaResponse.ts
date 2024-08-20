import React, { useState } from 'react';
import { useCompletion } from 'ai/react';
import { experimental_Stream as Stream } from 'ai/react';


const ExcuseGenerator = ({ task }) => {
  const [excuse, setExcuse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { complete } = useCompletion({
    api: '/api/ollama',
    model: 'llama2',
    onFinish: (result) => {
      setExcuse(result);
      setIsGenerating(false);
    },
  });

  const generateExcuse = async () => {
    setIsGenerating(true);
    setExcuse('');
    const prompt = `Genera una excusa creativa y humorística para no hacer la siguiente tarea: "${task}"`;
    await complete(prompt);
  };
}
export default ExcuseGenerator;
