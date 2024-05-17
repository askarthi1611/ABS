import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckingService } from './checking.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css'],
})
export class CheckingComponent implements OnInit {
  qualityCheckForm: FormGroup | any;
  data = [
    {
      id: 1,
      name: 'QC1',
      stages: [
        { id: 1, process: 'pending' },
        { id: 2, process: 'pending' },
      ],
    },
    {
      id: 2,
      name: 'QC2',
      stages: [
        { id: 1, process: 'pending' },
        { id: 2, process: 'pending' },
      ],
    },
  ];
  accordionCompletionStatus: boolean[] | any;

  constructor(
    private fb: FormBuilder,
    private qcService: CheckingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.qualityCheckForm = this.fb.group({
      qualityChecks: this.fb.array([]),
    });
    this.accordionCompletionStatus = new Array(this.data.length).fill(false);
    // Set the first element to true
    if (this.accordionCompletionStatus.length > 0) {
      this.accordionCompletionStatus[0] = true;
    }
    this.setQualityChecks();
    console.log(this.accordionCompletionStatus);
  }

  get qualityChecks(): any {
    return this.qualityCheckForm.get('qualityChecks') as any;
  }
  sub() {
    this.accordionCompletionStatus = new Array(this.data.length).fill(true);
  }
  setQualityChecks() {
    this.data.forEach((qc) => {
      const qcGroup = this.fb.group({
        name: [qc.name, Validators.required],
        stages: this.fb.array([]),
      });

      qc.stages.forEach((stage) => {
        const stageGroup = this.fb.group({
          process: [stage.process, Validators.required],
          qcStatus: ['', Validators.required],
          rejectionReason: [''],
        });
        (qcGroup.get('stages') as FormArray).push(stageGroup);
      });

      this.qualityChecks.push(qcGroup);
    });
  }

  //onAccordionFinish(index: any) {
  //  this.accordionCompletionStatus[index+1] = true;
  //}
  private configSuccess: MatSnackBarConfig = {
    panelClass: ['matsnackbrsuccess'],
    duration: 2000,
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['matsnackbrerror'],
    duration: 2000,
  };
  onAccordionFinish(index: number) {
    console.log(index);
    const currentAccordion = this.qualityChecks.at(index) as FormGroup;
    if (currentAccordion.valid) {
      this.accordionCompletionStatus[index + 1] = true;
      this.snackBar.open(
        'Current accordion input is complete',
        'Ok',
        this.configSuccess
      );
      console.log('Current accordion input is complete');
    } else {
      this.snackBar.open(
        'Current accordion input is not complete',
        'Close',
        this.configError
      );
      console.log('Current accordion input is not complete');
    }
  }
  onChildAccordionFinish(qcIndex: any, stageIndex: any) {
    console.log(qcIndex, stageIndex);
    const currentAccordion: any = this.qualityChecks.at(qcIndex) as FormGroup;
    let childcurrent = currentAccordion.at(stageIndex) as FormGroup;
    console.log(childcurrent, currentAccordion);
  }

  openNextAccordion(index: number) {
    if (index < this.qualityChecks.controls.length - 1) {
      const nextAccordion: any = this.qualityChecks.controls[
        index + 1
      ] as FormGroup;
      nextAccordion.get('accordion').setValue(true); // Assuming 'accordion' is a boolean form control
    }
  }

  onSubmit() {
    if (this.qualityCheckForm.valid) {
      this.qcService
        .submitQualityCheck(this.qualityCheckForm.value)
        .subscribe((response) => {
          console.log('Form submitted successfully', response);
        });
    }
  }
}
