import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { parse } from 'path';
import { CheckoutDto } from './dto/kasir.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cats/:name')
  findAll(@Param('name') name: string): string {
    return this.appService.findAll(name);
  }

  @Get('age/:age')
  a(@Param('age') age: string): string {
    let ageN = parseInt(age, 10);
    //parseInt digunakan untuk mengkonversi menjadi integer
    if (isNaN(ageN)) {
      //isNaN digunakan untuk mengecek apakah ageN ini integer atau tidak
      return 'Invalid age';
    }
    return this.appService.a(ageN);
  }

  @Get('bmi')
  bmi(
    @Query('weight') weight: string,
    @Query('height') height: string,
  ): string {
    let weightN = parseFloat(weight);
    let heightN = parseFloat(height);
    if (isNaN(weightN) || isNaN(heightN)) {
      return 'Invalid Input';
    }
    return this.appService.bmi(weightN, heightN);
  }

  @Post('luas')
  count(
    @Body('panjang') panjang: number,
    @Body('lebar') lebar: number,
  ): string | number {
    return this.appService.count(panjang, lebar);
  }

  @Post('BK')
  BelahKetupat(
    @Body('d1') d1: number,
    @Body('d2') d2: number,
    @Body('sisi') sisi: number,
  ): any {
    return this.appService.BelahKetupat(d1, d2, sisi);
  }

  @Get('bilangan/:angka')
  angka(@Param('angka') angka: number):
    | string
    | {
        angka: number;
        jenis: string;
        kuadrat: number;
        kelipatanLima: boolean;
      } {
    if (
      Number.isInteger(angka) ||
      Number.isNaN(angka) ||
      angka < 1 ||
      angka > 100
    ) {
      return 'Invalid Input';
    }

    return this.appService.angka(angka);
  }

  @Get('suhu')
  konversi(
    @Query('nilai') nilai: number,
    @Query('dari') dari: string,
    @Query('ke') ke: string,
  ):
    string
    | {
        nilaiAsal: number;
        satuanAsal: string;
        hasil: number;
        satuanHasil: string;
      } {
    return this.appService.konversi(nilai, dari, ke);
  }

  @Get('deret/:jenis/') 
  deret(@Param('jenis') jenis: string, @Query('jumlah') jumlah: number): any {
     if (
       Number.isInteger(jumlah) ||
       Number.isNaN(jumlah) ||
       jumlah < 1 ||
       jumlah > 20
     ) {
       return 'Invalid Input';
     }
    return this.appService.deret(jenis, jumlah)
  }

  @Post('nilai/hitung')
  @HttpCode(200)
  rapor(@Body('nama') nama: string, @Body('tugas') tugas: number[], @Body('uts') uts: number, @Body('uas') uas: number): any {
    if (typeof nama !== 'string' || nama.trim() === '') {
      return "Invalid Input";
    }

    if (!Array.isArray(tugas) || tugas.length === 0 || !tugas.every(item => typeof item === 'number')) {
      return "Invalid Input"
    }

    if (typeof uts !== 'number' || typeof uas !== 'number') {
      return "Invalid Input"
    }

    if (tugas.every(item => item < 0 || item > 100) || (uas < 0 || uas > 100) || (uts < 0 || uts > 100)) {
      return "Invalid Input"
    }

    return this.appService.rapor(nama, tugas, uts, uas)
  }

  @Post('checkout/:member')
  @HttpCode(404)
  CO(@Param('member') member: string, @Query('metode') metode: string, @Body() items: CheckoutDto) {
    return this.appService.CO(member, metode, items)
  } 
}



