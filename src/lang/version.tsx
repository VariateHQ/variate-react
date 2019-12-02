import { name, styles } from '../config/console';

export const show = (): void =>
  console.log(
    `%c ${name} %c __VERSION__ `,
    styles.brand,
    styles.type
  );