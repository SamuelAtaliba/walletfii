new Vue({
  el: '#app',
  data: {
      investmentAmount: null,
      results: {},
      showReport: false,
      currentDate: '',
      tijoloAmount: 0,
      papelAmount: 0
  },
  methods: {
      calculateInvestments() {
          const amount = parseFloat(this.investmentAmount);

          if (!isNaN(amount) && amount > 0) {
              this.tijoloAmount = (amount * 0.7).toFixed(2);
              this.papelAmount = (amount * 0.3).toFixed(2);

              this.results = {
                  logistic: (this.tijoloAmount * 0.2).toFixed(2),
                  corporate: (this.tijoloAmount * 0.1).toFixed(2),
                  shopping: (this.tijoloAmount * 0.1).toFixed(2),
                  hybrid: (this.tijoloAmount * 0.2).toFixed(2),
                  urban: (this.tijoloAmount * 0.1).toFixed(2),
                  cri: (this.papelAmount * 0.3333).toFixed(2),
                  fof: (this.papelAmount * 0.3333).toFixed(2),
                  fiagro: (this.papelAmount * 0.3333).toFixed(2)
              };

              this.currentDate = new Date().toLocaleDateString();
              this.showReport = true;
          } else {
              alert('Por favor, insira um valor válido.');
              this.showReport = false;
          }
      },
      downloadPDF() {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();

          doc.text(`Relatório de Investimentos - ${this.currentDate}`, 10, 10);
          doc.text('Fundos Imobiliários de Tijolo (70%)', 10, 20);
          doc.text(`Total: R$ ${this.tijoloAmount}`, 10, 30);
          doc.text(`Logístico: R$ ${this.results.logistic}`, 10, 40);
          doc.text(`Lajes Corporativas: R$ ${this.results.corporate}`, 10, 50);
          doc.text(`Shoppings: R$ ${this.results.shopping}`, 10, 60);
          doc.text(`Híbridos: R$ ${this.results.hybrid}`, 10, 70);
          doc.text(`Renda Urbana: R$ ${this.results.urban}`, 10, 80);

          doc.text('Fundos de Papel (30%)', 10, 90);
          doc.text(`Total: R$ ${this.papelAmount}`, 10, 100);
          doc.text(`CRI: R$ ${this.results.cri}`, 10, 110);
          doc.text(`FOF: R$ ${this.results.fof}`, 10, 120);
          doc.text(`Fiagro: R$ ${this.results.fiagro}`, 10, 130);

          doc.save(`Relatorio_Investimentos_${this.currentDate.replace(/\//g, '-')}.pdf`);
      }
  }
});
