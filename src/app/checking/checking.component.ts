import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckingService } from './checking.service';

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

  constructor(private fb: FormBuilder, private qcService: CheckingService) {}

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
  onAccordionFinish(index: number) {
    this.accordionCompletionStatus[index + 1] = true;

    // Disable or enable child accordions
    const parentAccordion = document.querySelector(
      `mat-expansion-panel[ng-reflect-accordion="${index + 1}"]`
    );
    if (parentAccordion) {
      const childAccordions = parentAccordion.querySelectorAll(
        'mat-expansion-panel'
      );
      childAccordions.forEach((accordion: HTMLElement | any) => {
        accordion.setAttribute(
          'disabled',
          `${!this.accordionCompletionStatus[index + 1]}`
        );
      });
    }

    // Enable the next accordion if there's one
    if (index + 1 < this.accordionCompletionStatus.length - 1) {
      this.accordionCompletionStatus[index + 1 + 1] = false;
    }
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
