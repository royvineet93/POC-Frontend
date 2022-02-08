import {Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {VendorService} from '../../_services/vendor.service';
import {AuthenticationService, ClientService} from '../../_services';
import { DialogService  } from '../../_services/dialog.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ROLES} from '../roles';
import {Router} from '@angular/router';
import {ItemService} from '../../_services/item.service';
import {InvoiceService} from '../../_services/invoice.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit, DoCheck {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];
  @Input() displayedHeaders: string[];
  @Input() transform: (args: any) => [];
  @Input() service: string;
  @Input() showButtons:boolean;
  selection = new SelectionModel<Element>(true, []);
  showEdit = false;
  showDelete = false;
  canEditDelete = false;
  itemSer = false;
  vendorSer = false;
  clientSer = false;
  invService = false;
  currentUser = this.authenticationService.currentUserValue;
  tableData: any;


  constructor(private router: Router,
              private vendorService: VendorService,
              private clientService: ClientService,
              private itemService: ItemService,
              private invoiceService: InvoiceService,
              private dialogService: DialogService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.service === 'clientService') {
      this.clientSer = true;
      this.clientService.getClients().subscribe(data => {
        this.tableData = this.transform(data.data.client);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.dialogService.openDialog(error.error.message, 'ERROR');
      });
    } else if (this.service === 'vendorService') {
      this.vendorSer = true;
      this.vendorService.getVendors().subscribe(data => {
        this.tableData = this.transform(data.data.vendor);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.dialogService.openDialog(error.error.message, 'ERROR');
      });
    } else if (this.service === 'itemService') {
      this.itemSer = true;
      this.itemService.getItems().subscribe(data => {
        this.tableData = this.transform(data.data.item);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.dialogService.openDialog(error.error.message, 'ERROR');
      });
    }else if (this.service === 'invoiceService') {
      this.invService = true;
      this.invoiceService.getInvoices().subscribe(data => {
        this.tableData = this.transform(data.data.invoice);
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.dialogService.openDialog(error.error.message, 'ERROR');
      });
    }

    if (this.currentUser && this.currentUser.data && this.currentUser.data.user &&
      this.currentUser.data.user.role === ROLES.ADMIN) {
      this.canEditDelete = true;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  ngDoCheck() {
    if (this.selection.selected.length === 1 && this.canEditDelete) {
      this.showEdit = true;
    } else {
      this.showEdit = false;
    }

    if (this.selection.selected.length >= 1 && this.canEditDelete) {
      this.showDelete = true;
    } else {
      this.showDelete = false;
    }
  }

  confirmDeletion() {
    const dialogRef = this.dialogService.openConfimationDialog('CONFIRMATION');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeSelectedRows();
      }
    });
  }

  confirmExport() {
    const dialogRef = this.dialogService.openExportDialog('EXPORT');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.service === 'itemService') {
          this.itemService.exportReport().subscribe(data => {
            console.log('email sent successfully');
          }, error => {
            this.dialogService.openDialog(error.error.message, 'ERROR');
          });
        } else if (this.service === 'clientService') {
          this.clientService.exportReport().subscribe(data => {
            console.log('email sent successfully');
          }, error => {
            this.dialogService.openDialog(error.error.message, 'ERROR');
          });
        } else if (this.service === 'vendorService') {
          this.vendorService.exportReport().subscribe(data => {
            console.log('email sent successfully');
          }, error => {
            this.dialogService.openDialog(error.error.message, 'ERROR');
          });
        }else if (this.service === 'invoiceService') {
          // this.invoiceService.exportReport().subscribe(data => {
          //   console.log('email sent successfully');
          // }, error => {
          //   this.dialogService.openDialog(error.error.message, 'ERROR');
          // });
        }
      }
    });
  }

  confirmImport() {
    const dialogRef = this.dialogService.openImportDialog('IMPORT',this.service);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('call api to send email with export report');
      }
    });
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const deletedItem: any = item;

      if (this.clientSer) {
        this.clientService.deleteClient(deletedItem.id).subscribe(response => {
          const index: number = this.tableData.findIndex(data => data === item);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
          this.selection = new SelectionModel<Element>(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      } else if (this.vendorSer) {
        this.vendorService.deleteVendor(deletedItem.id).subscribe(response => {
          const index: number = this.tableData.findIndex(data => data === item);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
          this.selection = new SelectionModel<Element>(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      } else if (this.itemSer) {
        this.itemService.deleteItem(deletedItem.id).subscribe(response => {
          const index: number = this.tableData.findIndex(data => data === item);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
          this.selection = new SelectionModel<Element>(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      } else if (this.invService) {
        this.invoiceService.deleteInvoice(deletedItem.id).subscribe(response => {
          const index: number = this.tableData.findIndex(data => data === item);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
          this.selection = new SelectionModel<Element>(true, []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, error => {
          this.dialogService.openDialog(error.error.message, 'ERROR');
        });
      }
    });
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addForm() {
    if (this.service === 'itemService') {
      this.router.navigate(['addItem'], {queryParams: {data: JSON.stringify(this.selection.selected[0])}, skipLocationChange: true});
    }else if (this.service === 'invoiceService'){
      this.router.navigate(['addInvoice'], {queryParams: {data: JSON.stringify(this.selection.selected[0])}, skipLocationChange: true});
    } else {
      this.router.navigate(['addForm'], {queryParams: {service: this.service, data: JSON.stringify(this.selection.selected[0])}, skipLocationChange: true});
    }
  }

  openPdf(row:any){
    if (this.service === 'invoiceService'){
      this.router.navigate(['addInvoice'], {queryParams: {
          data: JSON.stringify(row),
          mode: 'view'
        }
        , skipLocationChange: true});
    }   
  }

  getClass() {
    if(this.showButtons === false){
      return 'hideButtons';
    }
    if (this.showEdit && this.showDelete) {
      return 'editAlign';
    } else if (!this.showEdit && this.showDelete) {
      return 'deleteAlign';
    }else {
      return 'headAlign';
    }
  }
  addClassToFirstElement(){
    if (this.showButtons === false){
      return 'firstItem';
    }
  }
}
