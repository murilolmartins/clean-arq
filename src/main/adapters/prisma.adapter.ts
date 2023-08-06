export interface PrismaAdapter {
  create: ({ data, select }: { data: any; select: any }) => Promise<any>;
}
