export class Todo {
  //   id?: number; //timestampp
  //   content?: string; //timestampp
  //   isCompleted?: boolean;
  //   constructor(id: number, content: string) {
  //     this.id = id;
  //     this.content = content;
  //     this.isCompleted = false;
  //   }
  //Phia duoi la cach ben duoi
  constructor(
    public id: number,
    public content?: string,
    public isCompleted: boolean = false
  ) {}
}
