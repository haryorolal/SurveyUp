import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { SurveyService } from '../shared/survey.service';

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrls: ['./takesurvey.component.scss']
})
export class TakesurveyComponent implements OnInit {

  public name: string="";
  public storeIt:any=[];
  public questionList: any = [];
  private da: any =[];
  public currentQuestion:number = 0;  
 
  counter=60;
  public getallQuestions:any=[];
  incorrectAnswer:number=0;
  interval$:any;
  isquizComplete: boolean=false;

  constructor(private router: Router, private survey: SurveyService) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.getQuestions();
    this.startTimer();
    console.log(this.storeIt);
  }

  getQuestions(){

    this.survey.getData().subscribe(
      res => {
        this.da = res        
          this.questionList = [];
          this.da.results.forEach((data) => {

          const incorrectanswer = data.incorrect_answers;
          const correctanswer = data.correct_answer;

          //this.getallQuestions = data.question;
         
          let currentOptions = incorrectanswer;
          currentOptions.push(correctanswer);
          data.options = currentOptions;
          this.questionList.push(data);
        })
        console.log('final', this.questionList)    
        
      }
    );
  }

  saveResponses(data){
     this.storeIt.push(data) 
      console.log(data);
  }
  

  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }

  
  Answer(currentQues:number, option:any){ 
               
      if(option){  
        setTimeout(() => {
          this.currentQuestion++;
          this.saveResponses(option);
          this.ResetTimer();
        }, 1000);
        
      }else{  
        setTimeout(() => {                  
          this.currentQuestion++;
          this.saveResponses(option);
          this.ResetTimer();
          
        }, 1000);
        
      }
      if(currentQues === this.questionList.length){
        setTimeout(() => {
          this.isquizComplete = true;
          this.stopTimer();
        }, 1000);
      }
    
  }

  startTimer(){
    this.interval$ = interval(1000).subscribe(()=>{
      this.counter--;
      if(this.counter===0 ){
        this.currentQuestion++;
        this.counter=60;
      }/*else if(this.currentQuestion === this.questionList.length){
        this.stopTimer();
        this.isquizComplete = true;
      }*/
    })
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopTimer(){
    this.counter=0;
    this.interval$.unsubscribe();    
  }

  ResetTimer(){
    this.stopTimer();
    this.counter=60;
    this.startTimer();
    
  }

  resertQuiz(){
    this.ResetTimer();
    this.getQuestions();
    this.currentQuestion=0;
  }

 

}
