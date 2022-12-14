import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CatDto } from './cat.dto';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listCats() {
    const [rows] = await db.execute('SELECT * FROM macskak');
    return { cat: rows };
  }

  @Get()
  @Render('index')
  async searchCats(@Param('search') search) {
    const [sResults] = await db.execute(
      'SELECT suly, szem_szin FROM macskak WHERE szem_szin = ?',
      [search],
    );

    return { cat: sResults };
  }

  @Get('cats/new')
  @Render('addCat')
  addCatForm() {
    return {};
  }
  @Post('cats/new')
  @Redirect()
  async addCat(@Body() cat: CatDto) {
    const []: any = await db.execute(
      'INSERT INTO `macskak` (`suly`,`szem_szin`) VALUES (?, ?)',
      [cat.weight, cat.eyeColor],
    );
    return { url: '/' };
  }
}
