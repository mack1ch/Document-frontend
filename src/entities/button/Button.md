Базовый пример кнопки.

```jsx harmony
import { Button } from '@/entities/button';

<Button>Создать проект</Button>;
```

У кнопки есть различные стили (остальные пока в разработке)

```jsx harmony
import { Gapped } from '@shared/gapped';

const bgStyle = {
    backgroundImage: `linear-gradient(to right, rgba(130, 130, 130, 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(130, 130, 130, 0.5) 1px, transparent 1px)`,
    backgroundSize: `16px 16px`,
    backgroundPosition: `-8px -8px`,
    padding: 16,
};

<Gapped vertical>
    <Gapped>
        <Button use="default">Default</Button>
    </Gapped>
    <Gapped style={bgStyle}>
        <Button use="default">Default</Button>
    </Gapped>
</Gapped>;
```
