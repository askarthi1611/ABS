<h1>QC Approval Screen with Dynamic Accordions in Angular Reactive Forms</h1>

<p>This project was generated with <a href="https://github.com/angular/angular-cli" target="_blank">Angular CLI</a> version 15.2.4.</p>

<h2>Development server</h2>

<p>Run <code>ng serve</code> for a dev server. Navigate to <code>http://localhost:4200/</code>. The application will automatically reload if you change any of the source files.</p>

<h2>Code scaffolding</h2>

<p>Run <code>ng generate component component-name</code> to generate a new component. You can also use <code>ng generate directive|pipe|service|class|guard|interface|enum|module</code>.</p>

<h2>Build</h2>

<p>Run <code>ng build</code> to build the project. The build artifacts will be stored in the <code>dist/</code> directory.</p>

<h2>Further help</h2>

<p>To get more help on the Angular CLI use <code>ng help</code> or go check out the <a href="https://angular.io/cli" target="_blank">Angular CLI Overview and Command Reference</a> page.</p>


<div>
  <p><strong>Initialization:</strong></p>
  <ul>
    <li>Sets up the form group (<code>qualityCheckForm</code>) to manage the overall form structure.</li>
    <li>Initializes the array (<code>childaccordionCompletionStatus</code>) to track the completion status of child accordions.</li>
  </ul>

  <p><strong>Data Population:</strong></p>
  <ul>
    <li>Uses sample data (<code>data</code>) to populate the form with quality checks and their stages during initialization.</li>
  </ul>

  <p><strong>Form Structure:</strong></p>
  <ul>
    <li>Utilizes Angular Material's <code>mat-accordion</code> and <code>mat-expansion-panel</code> components to create an accordion-style interface for quality checks and stages.</li>
    <li>Each quality check is represented as an expansion panel, with its stages nested within.</li>
  </ul>

  <p><strong>Form Validation:</strong></p>
  <ul>
    <li>Implements validation for required fields such as the name of the quality check and the process for each stage.</li>
  </ul>

  <p><strong>Completion Tracking:</strong></p>
  <ul>
    <li>Tracks the completion status of each accordion and stage based on the validity of the corresponding form groups.</li>
  </ul>

  <p><strong>Event Handling:</strong></p>
  <ul>
    <li>Listens for changes in form values and completion status to update the UI dynamically.</li>
  </ul>

  <p><strong>Submission Handling:</strong></p>
  <ul>
    <li>Provides functionality to submit the form data to a service (<code>CheckingService</code>) for further processing.</li>
    <li>Displays success or error messages using Angular Material's <code>MatSnackBar</code> component based on the submission result.</li>
  </ul>

  <p><strong>Overall:</strong></p>
  <p>The component offers a user-friendly interface for managing quality checks and ensures data integrity through validation and submission handling.</p>
</div>
