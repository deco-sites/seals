import { useEffect, useRef } from "preact/hooks";

// themes: quiet stillness, freedom from expectation, nourished by source
// visualization: Nodes flow freely while remaining connected to their source, finding peace in stillness

const TetheredFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas ref not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Canvas context not found');
      return;
    }
    
    console.log('Canvas and context initialized');
    
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 800;
      const height = rect.height || 200;
      
      // Set canvas size
      canvas.width = width;
      canvas.height = height;
      
      console.log('Canvas size updated:', width, 'x', height);
      
      return { width, height };
    };
    
    const initAnimation = () => {
      const { width, height } = updateCanvasSize();
      
      // Só inicializar se temos dimensões válidas
      if (width <= 0 || height <= 0) {
        console.log('Invalid canvas dimensions, retrying...', width, height);
        setTimeout(initAnimation, 100);
        return;
      }
      
      console.log('Starting animation with dimensions:', width, height);
      
      let time = 0;
      let animationFrame: number;
      
      // Desenho simples de teste primeiro
      const drawTest = () => {
        // Limpar canvas
        ctx.fillStyle = '#FAFAFA';
        ctx.fillRect(0, 0, width, height);
        
        // Desenhar alguns círculos de teste
        for (let i = 0; i < 10; i++) {
          const x = (i + 1) * (width / 11);
          const y = height / 2 + Math.sin(time * 0.01 + i) * 20;
          
          ctx.fillStyle = `rgba(34, 197, 94, 0.6)`;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Desenhar algumas linhas de teste
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        for (let x = 0; x <= width; x += 10) {
          const y = height / 2 + Math.sin((time * 0.005) + (x * 0.01)) * 30;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Texto de debug
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.font = '16px Arial';
        ctx.fillText(`Animation running: ${time.toFixed(0)}`, 20, 30);
        ctx.fillText(`Canvas: ${width}x${height}`, 20, 50);
        
        time += 1;
      };
      
      const animate = () => {
        drawTest();
        animationFrame = requestAnimationFrame(animate);
      };
      
      // Começar animação
      animate();
      console.log('Animation started');
      
      // Handle resize
      const handleResize = () => {
        console.log('Window resized, updating canvas...');
        updateCanvasSize();
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        console.log('Cleaning up animation');
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', handleResize);
        
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
        }
      };
    };
    
    // Aguardar um frame para o DOM estar pronto
    console.log('Scheduling animation initialization...');
    requestAnimationFrame(() => {
      console.log('RequestAnimationFrame called, initializing...');
      initAnimation();
    });
    
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      class="absolute inset-0 w-full h-full"
      style={{ 
        zIndex: 0,
        pointerEvents: 'none',
        background: '#FAFAFA'
      }}
    />
  );
};

export default TetheredFlow; 