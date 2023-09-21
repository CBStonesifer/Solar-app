import React, { useState, useEffect } from 'react';


function Electrons(props) {
    const friends = props.friends
    
    const angle = 360 / friends.length;
    const radius = props.radius;
    const centerX = props.cx; // X-coordinate of the center point
    const centerY = props.cy; // Y-coordinate of the center point
    const speed = props.speed;

    const initialElectrons = friends.map((name, index) => {
        const x = centerX + radius * Math.cos(index * angle * (Math.PI / 180));
        const y = centerY + radius * Math.sin(index * angle * (Math.PI / 180));
        return { position: { x, y } };
    });

    function Ring(cx, cy, r_in, r_out) {
        return (
        <svg width={props.cx*2} height={props.cy*2} >
            <circle cx={cx} cy={cy} r={r_out} fill="transparent"
            stroke="#000000"
            strokeWidth="10"
            />
            <circle cx={cx} cy={cy} r={r_in} fill="white" />
        </svg>
        );
    }

    const [electrons, setElectrons] = useState(initialElectrons);
    // Add an effect to rotate the electrons around the center point
    useEffect(() => {
        const rotateElectrons = () => {
        const newElectrons = electrons.map((electron, index) => {
                const newAngle = index * angle + (performance.now() / speed) * 360;
                const newX = centerX + radius * Math.cos(newAngle * (Math.PI / 180));
                const newY = centerY + radius * Math.sin(newAngle * (Math.PI / 180));
                return { position: { x: newX, y: newY } };
            });
            setElectrons(newElectrons);
        };

        // Rotate the electrons every 15ms (60fps is one frame per 16ms)
        const interval = setInterval(rotateElectrons, 15);

        // Return a cleanup function to stop the rotation when the component unmounts
        return () => clearInterval(interval);
    }, [electrons]);

    return (
    
    <svg width={props.cx*2} height={props.cy*2}>
        {Ring(props.cx, props.cy, radius-1, radius-2)}
        
    
        {electrons.map((electron, index) => (
            <circle
            key={index}
            cx={electron.position.x}
            cy={electron.position.y}
            r="10"
            fill="#000000"
            />
        ))}
            
        
    </svg>
  );
}

export default Electrons;
