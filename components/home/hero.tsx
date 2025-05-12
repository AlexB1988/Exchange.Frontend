import { Button } from '@/components/ui/button';
import ThemeImage from '@/components/theme/theme-image';

export default function Hero() {
  return (
    <div className="grid max-w-full auto-cols-min grid-rows-2 justify-between px-8">
      <h2 className="self-end xl:text-[40px] xl:leading-12 2xl:text-5xl">
        Место,
        <br /> где рождаются <br /> великие проекты
      </h2>

      <Button className="mt-25 h-16 font-normal xl:w-89 xl:text-2xl 2xl:w-119 2xl:text-3xl">
        Стать фрилансером
      </Button>

      <div className="relative col-start-2 row-start-1 row-end-3 size-189 xl:size-189 2xl:size-198">
        <ThemeImage
          srcLight="/girlWhite.png"
          srcDark="/manDark.png"
          alt="Изображение человека фрилансера"
          fill
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
}
