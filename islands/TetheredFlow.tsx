import { useEffect, useRef } from "preact/hooks";

// themes: quiet stillness, freedom from expectation, nourished by source
// visualization: Nodes flow freely while remaining connected to their source, finding peace in stillness

const TetheredFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to parent container with high DPI support
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || canvas.offsetWidth || 800;
      const height = rect.height || canvas.offsetHeight || 200;
      
      // Get device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual canvas size
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Scale back down using CSS
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      // Scale the context to account for device pixel ratio
      ctx?.scale(dpr, dpr);
      
      return { width, height };
    };
    
    const { width, height } = updateCanvasSize();
    
    let time = 0;
    let animationFrame: number;
    
    // Mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseInfluence = 0;
    
    // Background color - matching header
    const bgColor = '#FAFAFA';
    
    // Create nodes - each finding its own quiet stillness
    class Node {
      x: number;
      y: number;
      originX: number;
      originY: number;
      size: number;
      type: string;
      speed: number;
      direction: number;
      angle: number;
      connections: any[];
      opacity: number;
      phase: number;
      flowOffset: number;
      pulseSpeed: number;
      moveRange: number;
      shapeType: string;
      rotation: number;
      rotationSpeed: number;
      
      constructor(x: number, y: number, size: number, type: string) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.size = size;
        this.type = type; // 'heaven', 'earth', or 'vibe'
        this.speed = Math.random() * 0.01 + 0.005;
        this.direction = Math.random() * Math.PI * 2;
        this.angle = Math.random() * Math.PI * 2;
        this.connections = [];
        this.opacity = Math.random() * 0.4 + 0.2;
        this.phase = Math.random() * Math.PI * 2;
        this.flowOffset = Math.random() * 100;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.moveRange = Math.random() * 60 + 40; // Increased movement range
        
        // Shape variables
        this.shapeType = Math.random() > 0.6 ? 'rect' : 'line';
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }
      
      update() {
        // Update position with noise-based flow
        const noiseX = Math.sin(time * this.speed + this.phase) * this.moveRange;
        const noiseY = Math.cos(time * this.speed * 0.7 + this.phase) * this.moveRange;
        
        // Mouse interaction - subtle attraction
        const mouseDistanceX = mouseX - this.originX;
        const mouseDistanceY = mouseY - this.originY;
        const mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY);
        
        // Influence decreases with distance, max influence within 200px
        const maxMouseDistance = 200;
        const mouseInfluenceStrength = mouseInfluence * Math.max(0, 1 - mouseDistance / maxMouseDistance);
        
        const mouseAttractionX = (mouseDistanceX / mouseDistance || 0) * mouseInfluenceStrength * 15;
        const mouseAttractionY = (mouseDistanceY / mouseDistance || 0) * mouseInfluenceStrength * 15;
        
        // Different movement patterns based on type
        if (this.type === 'heaven') {
          // Heaven nodes move more freely and are more responsive to mouse
          this.x = this.originX + noiseX + mouseAttractionX * 1.5;
          this.y = this.originY + noiseY * 0.7 + mouseAttractionY * 1.2;
        } else if (this.type === 'earth') {
          // Earth nodes move in more structured patterns, less mouse influence
          this.x = this.originX + noiseX * 0.6 + Math.sin(time * 0.02 + this.flowOffset) * 10 + mouseAttractionX * 0.8;
          this.y = this.originY + noiseY * 0.8 + mouseAttractionY * 0.6;
        } else if (this.type === 'vibe') {
          // Vibe coder moves in a unique pattern and is very responsive to mouse
          const stayFactor = 0.3 + Math.sin(time * 0.02) * 0.1;
          this.x = this.originX + Math.sin(time * 0.03) * 20 + mouseAttractionX * 2;
          this.y = this.originY + Math.cos(time * 0.04) * 20 + mouseAttractionY * 2;
          
          // Pulse normally, no mouse influence on size
          this.size = 12 + Math.sin(time * 0.05 + this.phase) * 4;
        }
        
        // Update rotation for shapes - constant speed
        this.rotation += this.rotationSpeed;
      }
      
      draw(context: CanvasRenderingContext2D) {
        // Set fill based on type
        if (this.type === 'heaven') {
          context.fillStyle = `rgba(50, 50, 50, ${this.opacity})`;
        } else if (this.type === 'earth') {
          context.fillStyle = `rgba(40, 40, 40, ${this.opacity})`;
        } else { // vibe
          context.fillStyle = `rgba(20, 20, 20, ${this.opacity + 0.3})`;
        }
        
        // Draw shape
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        
        if (this.shapeType === 'rect') {
          // Rectangle
          const pulseSize = this.size * (1 + Math.sin(time * this.pulseSpeed) * 0.3);
          context.fillRect(-pulseSize/2, -pulseSize/2, pulseSize, pulseSize);
        } else {
          // Line
          const pulseLength = this.size * 2 * (1 + Math.sin(time * this.pulseSpeed) * 0.3);
          context.fillRect(-pulseLength/2, -2, pulseLength, 4); // Increased thickness from 2 to 4 and height from 1 to 2
        }
        
        context.restore();
      }
    }
    
    // Create a flowing path - nourishment flowing from source
    class FlowingPath {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      height: number;
      speed: number;
      points: any[];
      opacity: number;
      controlPoints: any[];
      
      constructor(startX: number, startY: number, endX: number, endY: number, height: number, speed: number) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.height = height;
        this.speed = speed;
        this.points = [];
        this.opacity = 0.07;
        
        // Generate control points
        this.controlPoints = [];
        const segments = 3;
        for (let i = 0; i < segments; i++) {
          this.controlPoints.push({
            x: this.startX + (this.endX - this.startX) * ((i + 1) / (segments + 1)),
            y: this.startY + (this.endY - this.startY) * ((i + 1) / (segments + 1)),
            offsetX: Math.random() * 100 - 50,
            offsetY: Math.random() * 100 - 50,
            phaseOffset: Math.random() * Math.PI * 2
          });
        }
      }
      
      update() {
        // Update control points animation
        for (const point of this.controlPoints) {
          point.currentOffsetX = Math.sin(time * this.speed + point.phaseOffset) * point.offsetX;
          point.currentOffsetY = Math.cos(time * this.speed + point.phaseOffset) * point.offsetY;
        }
        
        // Generate points array for the path
        this.points = [{ x: this.startX, y: this.startY }];
        
        // Add control points
        for (const point of this.controlPoints) {
          this.points.push({
            x: point.x + point.currentOffsetX,
            y: point.y + point.currentOffsetY
          });
        }
        
        // Add end point
        this.points.push({ x: this.endX, y: this.endY });
      }
      
      draw(context: CanvasRenderingContext2D) {
        // Check mouse distance to this path for green effect
        const midIndex = Math.floor(this.points.length / 2);
        const midPoint = this.points[midIndex] || this.points[0];
        const mouseDistanceToPath = Math.sqrt(
          (mouseX - midPoint.x) ** 2 + (mouseY - midPoint.y) ** 2
        );
        
        // Green color mixing for flowing paths
        const pathMouseInfluence = mouseInfluence * Math.max(0, 1 - mouseDistanceToPath / 180);
        const baseColor = { r: 30, g: 30, b: 30 };
        const greenColor = { r: 34, g: 197, b: 94 }; // Tailwind green-500
        
        const finalColor = {
          r: Math.round(baseColor.r * (1 - pathMouseInfluence) + greenColor.r * pathMouseInfluence),
          g: Math.round(baseColor.g * (1 - pathMouseInfluence) + greenColor.g * pathMouseInfluence),
          b: Math.round(baseColor.b * (1 - pathMouseInfluence) + greenColor.b * pathMouseInfluence)
        };
        
        const enhancedOpacity = this.opacity + pathMouseInfluence * 0.3;
        const enhancedWidth = 2.0; // Removed scale effect, keeping constant width
        
        context.strokeStyle = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${enhancedOpacity})`;
        context.lineWidth = enhancedWidth;
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        
        // Draw bezier curves through control points
        for (let i = 1; i < this.points.length - 2; i++) {
          const xc = (this.points[i].x + this.points[i + 1].x) / 2;
          const yc = (this.points[i].y + this.points[i + 1].y) / 2;
          context.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        
        // Last curve
        const last = this.points.length - 1;
        context.quadraticCurveTo(
          this.points[last - 1].x,
          this.points[last - 1].y,
          this.points[last].x,
          this.points[last].y
        );
        
        context.stroke();
      }
    }
    
    // Initialize nodes in an asymmetric pattern
    let nodes: Node[] = [];
    let flowingPaths: FlowingPath[] = [];
    
    const initNodes = () => {
      // Upper region (heaven) - sparser
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width * 0.8 + width * 0.1;
        const y = Math.random() * height * 0.4;
        const size = Math.random() * 8 + 4; // Increased from 4+2 to 8+4
        
        nodes.push(new Node(x, y, size, 'heaven'));
      }
      
      // Middle band - asymmetrically distributed
      for (let i = 0; i < 15; i++) {
        // Biased toward left
        const bias = Math.random() * Math.random(); // Square distribution for left bias
        const x = width * bias * 0.7 + width * 0.1;
        const y = height * 0.4 + Math.random() * height * 0.2;
        const size = Math.random() * 8 + 4; // Increased from 4+2 to 8+4
        
        nodes.push(new Node(x, y, size, 'earth'));
      }
      
      // Lower region (earth) - denser
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * width * 0.7 + width * 0.15;
        const y = height * 0.6 + Math.random() * height * 0.35;
        const size = Math.random() * 8 + 4; // Increased from 4+2 to 8+4
        
        nodes.push(new Node(x, y, size, 'earth'));
      }
      
      // Special node (The Vibe Coder) - positioned at left center
      nodes.push(new Node(width * 0.15, height * 0.5, 12, 'vibe')); // Increased from 6 to 12
    };
    
    // Initialize flowing paths
    const initFlowingPaths = () => {
      // Find the vibe coder node (last one)
      const vibe = nodes[nodes.length - 1];
      
      // Create paths from vibe coder to various parts of canvas
      for (let i = 0; i < 12; i++) {
        // Determine end points with bias toward right side (ahead)
        const endX = width * (0.6 + Math.random() * 0.3);
        const endY = Math.random() * height;
        
        // Create flowing path
        flowingPaths.push(new FlowingPath(
          vibe.x, vibe.y, 
          endX, endY, 
          50 + Math.random() * 50,
          0.02 + Math.random() * 0.01
        ));
      }
      
      // Add boundary flowing path (heaven/earth division)
      flowingPaths.push(new FlowingPath(
        0, height * 0.5,
        width, height * 0.5,
        20,
        0.01
      ));
    };
    
    // Create connections between nodes
    const createConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connections = [];
        
        // Connect to nearby nodes
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Variable connection distance based on position
            let maxDistance = 160; // Increased from 80 to 160
            
            // Special node (last one) has longer connections
            if (i === nodes.length - 1 || j === nodes.length - 1) {
              maxDistance = 400; // Increased from 200 to 400
            }
            
            if (distance < maxDistance) {
              nodes[i].connections.push({
                to: j,
                distance: distance,
                opacity: (1 - (distance / maxDistance)) * 0.3
              });
            }
          }
        }
      }
    };
    
    // Draw all connections
    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (const conn of node.connections) {
          const targetNode = nodes[conn.to];
          
          // Check if mouse is near this connection
          const connectionMidX = (node.x + targetNode.x) / 2;
          const connectionMidY = (node.y + targetNode.y) / 2;
          const mouseDistanceToConnection = Math.sqrt(
            (mouseX - connectionMidX) ** 2 + (mouseY - connectionMidY) ** 2
          );
          
          // Connection becomes more visible and green when mouse is near
          const connectionMouseInfluence = mouseInfluence * Math.max(0, 1 - mouseDistanceToConnection / 150);
          const enhancedOpacity = conn.opacity + connectionMouseInfluence * 0.4;
          const enhancedWidth = 1.5; // Removed scale effect, keeping constant width
          
          // Green color mixing based on mouse influence
          const greenInfluence = connectionMouseInfluence;
          const baseColor = { r: 30, g: 30, b: 30 };
          const greenColor = { r: 34, g: 197, b: 94 }; // Tailwind green-500
          
          const finalColor = {
            r: Math.round(baseColor.r * (1 - greenInfluence) + greenColor.r * greenInfluence),
            g: Math.round(baseColor.g * (1 - greenInfluence) + greenColor.g * greenInfluence),
            b: Math.round(baseColor.b * (1 - greenInfluence) + greenColor.b * greenInfluence)
          };
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          
          // Use bezier curves for connections
          const midX = (node.x + targetNode.x) / 2;
          const midY = (node.y + targetNode.y) / 2;
          
          // Add flow to the connection - constant intensity
          const flowIntensity = 10;
          const flowOffsetX = Math.sin(time * 0.02 + i * 0.1) * flowIntensity;
          const flowOffsetY = Math.cos(time * 0.02 + i * 0.1) * flowIntensity;
          
          ctx.quadraticCurveTo(
            midX + flowOffsetX,
            midY + flowOffsetY,
            targetNode.x,
            targetNode.y
          );
          
          ctx.strokeStyle = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${enhancedOpacity})`;
          ctx.lineWidth = enhancedWidth;
          ctx.stroke();
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      time += 0.5;
      
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      
      // Update all flowing paths
      for (const path of flowingPaths) {
        path.update();
        path.draw(ctx);
      }
      
      // Update all nodes
      for (const node of nodes) {
        node.update();
      }
      
      // Recreate connections occasionally to adapt to movement
      if (time % 30 === 0) {
        createConnections();
      }
      
      // Draw connections
      drawConnections();
      
      // Draw all nodes
      for (const node of nodes) {
        node.draw(ctx);
      }
      
      // Add detachment/fulfillment representation
      // Find the vibe coder node (last one)
      const vibe = nodes[nodes.length - 1];
      
      // Draw subtle emanation representing "detached, yet at one with all"
      ctx.save();
      ctx.translate(vibe.x, vibe.y);
      
      // Check mouse distance to vibe node for green emanation effect
      const vibeMouseDistance = Math.sqrt(
        (mouseX - vibe.x) ** 2 + (mouseY - vibe.y) ** 2
      );
      const vibeMouseInfluence = mouseInfluence * Math.max(0, 1 - vibeMouseDistance / 120);
      
      // Create asymmetric pattern of lines
      const numLines = 20;
      for (let i = 0; i < numLines; i++) {
        const angle = i / numLines * Math.PI * 2;
        const length = 40 + Math.sin(angle * 3 + time * 0.05) * 20; // Increased length
        
        // Green color mixing for emanation
        const baseColor = { r: 20, g: 20, b: 20 };
        const greenColor = { r: 34, g: 197, b: 94 }; // Tailwind green-500
        
        const finalColor = {
          r: Math.round(baseColor.r * (1 - vibeMouseInfluence) + greenColor.r * vibeMouseInfluence),
          g: Math.round(baseColor.g * (1 - vibeMouseInfluence) + greenColor.g * vibeMouseInfluence),
          b: Math.round(baseColor.b * (1 - vibeMouseInfluence) + greenColor.b * vibeMouseInfluence)
        };
        
        const enhancedOpacity = 0.2 + vibeMouseInfluence * 0.4;
        const enhancedWidth = 1.5; // Removed scale effect, keeping constant width
        
        ctx.strokeStyle = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${enhancedOpacity})`;
        ctx.lineWidth = enhancedWidth;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(angle) * length,
          Math.sin(angle) * length
        );
        ctx.stroke();
      }
      
      ctx.restore();
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;
      
      // Check if mouse is within canvas bounds
      if (relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height) {
        mouseX = relativeX;
        mouseY = relativeY;
        mouseInfluence = 1; // Active when mouse is over canvas
      } else {
        mouseInfluence = Math.max(0, mouseInfluence - 0.02); // Gradually fade influence when outside
      }
    };
    
    // Add event listeners to document for global mouse tracking
    document.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    initNodes();
    initFlowingPaths();
    createConnections();
    animate();
    
    // Handle resize
    const handleResize = () => {
      const { width: newWidth, height: newHeight } = updateCanvasSize();
      // Reinitialize with new dimensions if they changed significantly
      if (Math.abs(newWidth - width) > 10 || Math.abs(newHeight - height) > 10) {
        nodes.length = 0;
        flowingPaths.length = 0;
        initNodes();
        initFlowingPaths();
        createConnections();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Clear all arrays and objects to prevent memory leaks
      nodes.length = 0;
      flowingPaths.length = 0;
      
      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      class="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default TetheredFlow; 