# Interactive 3D Particle System

A real-time interactive 3D particle system built with Three.js and MediaPipe for hand gesture recognition.

## Features

### 🎨 Multiple Particle Templates
- **Hearts** - Romantic heart-shaped particle formation
- **Flowers** - Beautiful flower petal patterns
- **Saturn** - Saturn with rings effect
- **Buddha** - Statue-like formation
- **Fireworks** - Animated fireworks display
- **Stars** - Starfield distribution

### 🤚 Hand Gesture Control
- **Camera-based hand detection** using MediaPipe
- **Two-hand scaling**: Control particle expansion/collapse by moving hands apart/together
- **Single-hand scaling**: Use hand size to control particle scale
- **Real-time response**: Smooth transitions and immediate feedback

### 🎨 Color Customization
- **Custom color picker** for any color selection
- **Preset color palette** with 8 carefully selected colors
- **Real-time color updates** - instant visual feedback

### ⚙️ Particle Settings
- **Particle Size Control**: Adjust individual particle sizes (0.5 - 5.0)
- **Particle Count Control**: Adjust number of particles (100 - 2000)
- **Real-time updates** - changes apply immediately

### 🎯 User Interface
- **Modern, clean design** with glassmorphism effects
- **Intuitive controls** organized in logical groups
- **Live camera preview** in corner when hand tracking is active
- **Status indicators** for camera and gesture detection
- **Responsive layout** that works on different screen sizes

## Technical Implementation

### Technologies Used
- **Three.js** - 3D graphics and particle rendering
- **MediaPipe Hands** - Hand gesture recognition
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS** - Glassmorphism, gradients, animations

### Architecture
- **Object-oriented design** with a main `ParticleSystem` class
- **Modular template system** for easy addition of new formations
- **Efficient particle management** with BufferGeometry
- **Smooth animations** using requestAnimationFrame

### Hand Detection Logic
- **Distance-based scaling**: Calculates distance between palm centers
- **Fallback single-hand mode**: Uses hand size when only one hand is detected
- **Smooth interpolation**: Gradual scale transitions for natural movement
- **Error handling**: Graceful degradation when camera access is denied

## Usage Instructions

1. **Open the page** - Navigate to `particle-system.html`
2. **Choose a template** - Click on any template button to change particle formation
3. **Select colors** - Use the color picker or preset colors
4. **Adjust settings** - Use sliders to control size and count
5. **Enable hand control** - Click "Start Camera" to enable gesture control
6. **Use gestures** - Move hands apart to expand, together to contract

## Browser Compatibility

- **Chrome/Edge** - Full support with WebRTC and WebGL
- **Firefox** - Supported but may require camera permissions
- **Safari** - Basic support, hand detection may have limitations
- **Mobile** - Limited support due to camera constraints

## Performance Notes

- **Particle count** affects performance significantly
- **Hand tracking** requires moderate CPU resources
- **Recommended specs**: Modern browser with WebGL support
- **Optimization**: Use lower particle counts on older devices

## Future Enhancements

- Additional particle templates (spiral, galaxy, text formations)
- Sound synchronization with particle movements
- Save/load configuration presets
- Multi-user gesture support
- VR/AR compatibility
- Advanced physics simulations