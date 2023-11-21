import { animate, style, transition, trigger } from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
    transition('* => *', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ]),
]);
