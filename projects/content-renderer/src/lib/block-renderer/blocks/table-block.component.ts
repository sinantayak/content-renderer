import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-table-block-display',
    imports: [],
    template: `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            @for (header of data.headers; track $index) {
              <th>{{ header }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data.rows; track $index) {
            <tr>
              @for (cell of row; track $index) {
                <td [innerHTML]="cell"></td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .table-container {
      overflow-x: auto;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    td {
      color: #4b5563;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: #f9fafb;
    }
  `]
})
export class TableBlockDisplayComponent {
  @Input() data: any;
}
