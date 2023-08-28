import { Button } from '@/entities/button';
import Pluc from '../../public/plus-16-light.svg';

export default function Home() {
    const bgStyle = {
        backgroundImage: `linear-gradient(to right, rgba(130, 130, 130, 0.5) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(130, 130, 130, 0.5) 1px, transparent 1px)`,
        backgroundSize: `16px 16px`,
        backgroundPosition: `-8px -8px`,
        padding: 16,
        display: 'flex',
        gap: '16px',
    };
    return (
        <>
            <div style={{ padding: '16px', display: 'flex', gap: '16px' }}>
                <Button>Default</Button>
                <Button use="custom">Custom</Button>
                <Button use="text">Text</Button>
                <Button icon={Pluc}>Default</Button>
            </div>
            <div style={bgStyle}>
                <Button>Default</Button>
                <Button use="custom">Custom</Button>
                <Button use="text">Text</Button>
                <Button icon={Pluc}>Default</Button>
            </div>
        </>
    );
}
