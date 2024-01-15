import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { LayoutService } from './layout.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  numbers: number[] = [];

  ngOnInit(): void {
    this.generateNumbersArray();

    const months = ['ديسمبر', 'نوفمبر', 'أكتوبر', 'سبتمبر', 'أغسطس', 'يوليو', 'يونيو', 'مايو', 'إبريل', 'مارس', 'فبراير', 'يناير'];
    const values = [30, 50, 15, 50, 60, 50, 45,50, 47, 45, 35, 70];

    this.createTensionLineChart(months, values);
  }

  createTensionLineChart(months: string[], values: number[]) {
    const ctx = document.getElementById('tensionLineChart') as HTMLCanvasElement;
    const tensionLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Tension Line Chart',
          data: values,
          borderColor: '#8A74F9',
          backgroundColor: 'rgba(138, 116, 249, 0.2)',
          tension: 0.5, 
          fill: true,
        }]
      },
      
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: months,
          },
          y: {
            beginAtZero: true,
            ticks: {
              display: false 
            }
          }
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
          title: {
            display: false, // Hide title
          }
        }
      },
    });
  }

  generateNumbersArray(): void {
    for (let i = 1; i <= 250; i++) {
      this.numbers.push(i);
    }
  }

  @ViewChild('copyButton') copyButton!: ElementRef;
  @ViewChild('linkInput') linkInput!: ElementRef;

  ngAfterViewInit() {
    const copyButton = this.copyButton.nativeElement;
    const linkInput = this.linkInput.nativeElement;

    copyButton.addEventListener('click', () => {
      linkInput.select();

      try {
        document.execCommand('copy');
        console.log('Link copied to clipboard!');
      } catch (err) {
        console.error('Unable to copy link to clipboard', err);
      }
    });
  }

  searchTable(): void {
    let searchInput: HTMLInputElement | null = document.getElementById("searchInput") as HTMLInputElement;
    let searchTerm: string = searchInput?.value.toLowerCase() || "";
    let tableData: HTMLCollectionOf<HTMLTableRowElement> | undefined = document.getElementById("tableData")?.getElementsByTagName("tr");

    for (let i = 0; tableData && i < tableData.length; i++) {
      const rowData: string = tableData[i].textContent?.toLowerCase() || "";

      if (rowData.includes(searchTerm)) {
        tableData[i].style.display = "";
      } else {
        tableData[i].style.display = "none";
      }
    }
  }

  selectedLanguage: string;

  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService
  ) {
    this.selectedLanguage = 'ar'; // Set default language to Arabic
    
    // Set the default language for the TranslateService
    this.translate.setDefaultLang(this.selectedLanguage);
  }
  
  toggleLayout() {
    this.layoutService.toggleLayout();
  }
  
  switchLanguage() {
    // Switch the language based on the current language
    this.selectedLanguage = this.selectedLanguage === 'ar' ? 'en' : 'ar';
    this.translate.use(this.selectedLanguage);
  }
}
