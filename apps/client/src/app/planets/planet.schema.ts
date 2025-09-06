import { z } from 'zod';

export const PlanetSchema = z.object({
  id: z.coerce.number(),
  planetName: z.string(),
  planetColor: z.string(),
  planetRadiusKM: z.coerce.number(),
  distInMillionsKM: z.object({
    fromSun: z.coerce.number(),
    fromEarth: z.coerce.number(),
  }),
  description: z.string(),
  imageUrl: z.url(),
  imageName: z.string(),
});

export type Planet = z.output<typeof PlanetSchema>;
