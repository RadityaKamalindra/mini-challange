import { Injectable } from '@nestjs/common';
import { CheckoutDto, ItemDto } from './dto/kasir.dto.js';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Duhnia!';
  }

  findAll(name: string): string {
    return `The Cat name is , ${name}!`;
  }

  a(age: number): string {
    if (age >= 18) {
      return `Aku sudah dewasa, aku takut kecewa, umur gwa ${age}`
    } else {
      return `Aku masih remaja, gw remaja puber akwwkwkwk, umur gwa ${age}`
    }
  }

  bmi(weight: number, height: number): string {
    if (weight <= 0 || height <= 0) {
      return 'Invalid Input';
    }
    if (isNaN(weight) || isNaN(height)) {
      return 'Invalid Input'
    }
    
    let bmi = weight / (height ** 2)
    let category: string = '';
    if (bmi < 18.5) {
      category = `Underweight`
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = `Normal weight`
    } else if (bmi >= 25 && bmi < 29.9) {
      category = `Overweight`
    } else {
      category = `Obesity`
    }
    return `your BMI is ${bmi.toFixed(2)} (${category})`;
  }
  count(panjang: number, lebar: number): string | number {
    if (panjang <= 0 || lebar <= 0) {
      throw new Error('Panjang dan lebar harus lebih dari 0')
    }
    return panjang * lebar
  }

  BelahKetupat(d1: number, d2: number, sisi: number): any {
    if (d1 <= 0 || d2 <= 0) {
      throw new Error('Panjang dan lebar harus lebih dari 0');
    }

    let luas = (d1 * d2) / 2;
    let keliling = 4 * sisi;
    let result = {
      luas: luas,
      keliling: keliling,
    }
    return result;
  }

  angka(angka: number): { angka: number, jenis: string, kuadrat: number, kelipatanLima: boolean } {
  

    let jenis = (angka % 2 === 0) ? "Genap" : "Ganjil"
    let kuadrat = angka ** 2
    let kelipatanLima = (angka % 5 === 0) ? true : false
    let result = {
      angka: angka,
      jenis: jenis,
      kuadrat: kuadrat,
      kelipatanLima: kelipatanLima,
    }

    return result
  }

  konversi(nilai: number, dari: string, ke: string): string | { nilaiAsal: number, satuanAsal: string, hasil: number, satuanHasil: string } {
    let hasil = 0
    let suhu = ["Celcius", "Fahrenheit", "Kelvin"].includes(dari && ke)
    

    if (dari == "Celcius" && ke == "Fahrenheit") {
      hasil = nilai * 9 / 5 + 32
    } else if (dari == 'Celcius' && ke == 'Kelvin') {
      hasil = nilai + 273.15
    } else if (dari == 'Fahrenheit' && ke == 'Celcius') {
      hasil = (nilai - 32) * 5 / 9
    } else if (dari == 'Fahrenheit' && ke == 'Kelvin') {
      hasil = ((nilai - 32) * 5 / 9) + 273.15
    } else if (dari == 'Kelvin' && ke == 'Celcius' && nilai > 0) {
      hasil = nilai - 273.15
    } else if (dari == 'Kelvin' && ke == 'Fahrenheit' && nilai > 0) {
      hasil = (nilai - 273.15) * 9 / 5 + 32
    } else if (dari == ke) {
      return 'konversi tidak boleh sama'
    } else {
      return 'silahkan cek input an anda kembali'
    }

    let result = {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil: Math.round(hasil * 100) / 100,
      satuanHasil: ke,
    };
    
    return result
    
  }

  deret(jenis: string, jumlah: number): any {
    let macam = ['Ganjil', 'Genap', 'Kuadrat'].includes(jenis)
    let hasil = 0
    let total = 0
    let nilai: number[] = []
    if (jenis == 'Ganjil') {
      for (let i = 1; i <= jumlah; i++) {
        hasil = 2 * i - 1;
        nilai.push(hasil)
        total += hasil
      }
    } else if (jenis == 'Genap') {
      for (let i = 1; i <= jumlah; i++) {
        hasil = 2 * i;
        nilai.push(hasil);
        total += hasil;
      }
    } else if (jenis == 'Kuadrat') {
      for (let i = 1; i <= jumlah; i++) {
        hasil = i ** 2;
        nilai.push(hasil);
        total += hasil;
      }
    }
    let result = {
      jenis: jenis,
      jumlah: jumlah,
      data: nilai,
      total: total
    }

    return result
  }

  rapor(nama: string, tugas: number[], uts: number, uas: number): any {
    let rataTugas = (tugas.reduce((total, n) => total + n, 0)) / tugas.length
    let nilai = (rataTugas * 0.3) + (uts * 0.3) + (uas * 0.4)
    let nilaiAkhir = Math.round(nilai * 100) / 100
    let predikat
    let status = (nilaiAkhir >= 75) ? "Lulus" : "Remidial"

    if (nilaiAkhir >= 90) {
      predikat = "A"
    } else if (nilaiAkhir >= 80) {
      predikat = "B"
    } else if (nilaiAkhir >= 70) {
      predikat = "C"
    } else {
      predikat = "D"
    }

    let result = {
      nama: nama,
      rataTugas: rataTugas,
      nilaiAkhir: nilaiAkhir,
      predikat: predikat,
      status: status
    }

    return result
  }
    
  private readonly diskonMember: Record<string, number> = {
    reguler: 0,
    silver: 0,
    gold: 0
  }

  CO(member: string, metode: string, dto: CheckoutDto) {
    const membar = member.toLocaleLowerCase()
    if (!membar || !(membar in this.diskonMember)) {
      return "Invalid"
    }

    const method = metode.toLowerCase()
    if (!method || !['tunai', 'qris'].includes(method)) {
      return "Invalid"
    }

    this.Items(dto?.items)

    return this.Total(membar, method, dto.items) 
  }

  private Items(items: ItemDto[]) {
    if (!Array.isArray(items) || items.length === 0) {
      return "Invalid"
    }

    if (items.length > 10) {
      return "Invalid"
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const index = i + 1

      if (!item || typeof item !== 'object') {
        return `Item ke-${index}: format item tidak valid`;
      }

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        return `Item ke-${index}: nama harus string dan tidak boleh kosong`;
      }

      if (typeof item.harga !== 'number' || item.harga <= 0) {
        return `Item ke-${index}: harga harus angka lebih dari 0`;
      }

      if (typeof item.qty !== 'number' || !Number.isInteger(item.qty) || item.qty <= 0) {
        return `Item ke-${index}: qty harus bilangan bulat lebih dari 0`;
      }
    }
  }

  private Total(membar: string, method: string, items: ItemDto[]) {
    let subtotal = 0;
    let totalItem = 0;

    const rincian = items.map((item) => {
      const itemSub = item.harga * item.qty
      subtotal += itemSub
      totalItem += item.qty

      return {
        nama: item.nama,
        harga: item.harga,
        qty: item.qty,
        subtotal: itemSub
      }
    })

    const persen = this.diskonMember[membar]
    const diskon = (subtotal * persen) / 100

    const afterDiskon = subtotal - diskon
    const biayaAdmin = method === 'qris' ? (afterDiskon * 1) / 100 : 0
    
    const total = afterDiskon + biayaAdmin

    return {
      membar,
      method,
      rincian,
      totalItem,
      subtotal, 
      diskon,
      biayaAdmin,
      total,
    };
  }
   

    
  
  

  

    

  
}
