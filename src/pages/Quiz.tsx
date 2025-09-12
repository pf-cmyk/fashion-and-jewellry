import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Gift, Heart, Sparkles, Star } from 'lucide-react';

interface QuizData {
  recipient: string;
  occasion: string;
  budget: string;
  style: string;
}

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    recipient: '',
    occasion: '',
    budget: '',
    style: ''
  });

  const questions = [
    {
      title: "Who are you shopping for?",
      subtitle: "Help us understand your special someone",
      options: [
        { value: 'partner', label: 'My Partner', icon: Heart, description: 'Someone special in your life' },
        { value: 'friend', label: 'Close Friend', icon: Star, description: 'A dear friend who deserves something beautiful' },
        { value: 'family', label: 'Family Member', icon: Gift, description: 'Mother, sister, daughter, or relative' },
        { value: 'colleague', label: 'Colleague', icon: Sparkles, description: 'Professional yet thoughtful' }
      ]
    },
    {
      title: "What's the occasion?",
      subtitle: "Every moment deserves the perfect touch",
      options: [
        { value: 'birthday', label: 'Birthday', description: 'Celebrating another year of life' },
        { value: 'anniversary', label: 'Anniversary', description: 'Commemorating special milestones' },
        { value: 'holiday', label: 'Holiday Season', description: 'Christmas, Easter, or special holidays' },
        { value: 'justbecause', label: 'Just Because', description: 'Spontaneous moments of appreciation' }
      ]
    },
    {
      title: "What's your budget?",
      subtitle: "Beautiful gifts at every price point",
      options: [
        { value: 'under50', label: 'Under $50', description: 'Thoughtful treasures that won\'t break the bank' },
        { value: '50-100', label: '$50 - $100', description: 'The sweet spot for meaningful gifts' },
        { value: '100-200', label: '$100 - $200', description: 'Premium pieces for special occasions' },
        { value: 'over200', label: '$200+', description: 'Luxury items for the most important moments' }
      ]
    },
    {
      title: "What's their style?",
      subtitle: "Help us match their personality",
      options: [
        { value: 'minimalist', label: 'Minimalist', description: 'Clean lines, simple elegance' },
        { value: 'bohemian', label: 'Bohemian', description: 'Free-spirited, artistic, natural' },
        { value: 'classic', label: 'Classic', description: 'Timeless, sophisticated, traditional' },
        { value: 'modern', label: 'Modern', description: 'Contemporary, bold, innovative' }
      ]
    }
  ];

  const handleAnswer = (field: keyof QuizData, value: string) => {
    setQuizData({ ...quizData, [field]: value });
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const isCompleted = Object.values(quizData).every(value => value !== '');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-muted">
        <div 
          className="h-1 bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Quiz Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-heading mb-4">{questions[currentStep].title}</h1>
          <p className="text-editorial text-muted-foreground">{questions[currentStep].subtitle}</p>
        </div>

        <div className="grid gap-4 max-w-2xl mx-auto">
          {questions[currentStep].options.map((option) => {
            const Icon = option.icon || (() => null);
            const field = ['recipient', 'occasion', 'budget', 'style'][currentStep] as keyof QuizData;
            const isSelected = quizData[field] === option.value;

            return (
              <Card
                key={option.value}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-medium)] ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-[var(--shadow-soft)]' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAnswer(field, option.value)}
              >
                <div className="flex items-start space-x-4">
                  {Icon && (
                    <div className={`p-3 rounded-full ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                    <p className="text-muted-foreground">{option.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="opacity-70"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {isCompleted ? (
            <Link to="/products" state={{ quizData }}>
              <Button variant="hero" size="lg">
                See My Recommendations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              onClick={() => setCurrentStep(Math.min(questions.length - 1, currentStep + 1))}
              disabled={currentStep === questions.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;