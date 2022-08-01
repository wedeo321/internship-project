import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts?: any[];
    totalMr: number = 0;
    totalMrs: number = 0;
    totalMiss: number = 0;
    totalMs: number = 0;

    length: number;
    chart;

    constructor(private accountService: AccountService) {}



    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
        this.accountService.getLength()
            .pipe(first())
            .subscribe(length => {
                this.length = length
                console.log("starting for loop");
                for(var i = 0; length > i; i++){
                    if(this.accounts[i].title === "Mr"){
                        this.totalMr++;
                    }
                }

                for(var i = 0; length > i; i++){
                    if(this.accounts[i].title === "Mrs"){
                        this.totalMrs++;
                    }
                }

                for(var i = 0; length > i; i++){
                    if(this.accounts[i].title === "Miss"){
                        this.totalMiss++;
                    }
                }

                for(var i = 0; length > i; i++){
                    if(this.accounts[i].title === "Ms"){
                        this.totalMs++;
                    }
                }

                this.chart = new Chart("canvas", {
                    type: 'bar',
                    data: {
                        labels: ['Mr', 'Mrs', 'Miss', 'Ms'],
                        datasets: [{
                            label: 'Titles',
                            data: [this.totalMr, this.totalMrs, this.totalMiss, this.totalMs],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
    }


    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id) 
            });
    }
}