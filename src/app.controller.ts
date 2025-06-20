import { Body, Controller, Get, Param, Post, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/enter")
  enterUser(@Body() body: any, @Res() res: any): any {
    const { isReady } = this.appService.addPlayer(body.playerName)
    if (isReady) {
      return res.redirect('/gamePage.html')
    }
    return res.redirect('/waitingPage.html')
  }

  @Get("/redirect")
  redirectPlayer(@Res() res: any) {
    const { isReady } = this.appService.redirection()
    if (isReady) {
      res.status(300).redirect('/gamePage.html')
    }

    return { isOpponentReady: false }
  }

  @Get("/getBoard")
  serveBoard() {
    return this.appService.serveBoard()
  }

  @Get("/checkWinner")
  checkWinner() {
    return this.appService.getWinner()
  }

  @Post("/markBox/:row/:col")
  markBox(@Param("row") row: any, @Param("col") col: any, @Req() req: any) {
    console.log("The values are", row, col)
    console.log(req.cookies["playerName"])
    return this.appService.markBox(Number(row), Number(col), req.cookies["playerName"])
  }

  @Get("/replay")
  replay(@Res() res: any) {
    this.appService.replay()
    return res.status(302).redirect("/waitingPage.html")
  }

  @Get("/exit")
  exitGame(@Res() res: any, @Req() req : any) {
    this.appService.exitGame(req.cookies["playerName"])
    return res.redirect("/index.html")
  }
}
