import { Component, EventEmitter, OnInit, Output } from
    '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
    public filterText: string = '';
    @Output() name = new EventEmitter<string>();
    constructor(private router: Router, private route: ActivatedRoute) { }
    ngOnInit(): void {
    }
    sendFilter() {
        this.router.navigate(['/'], {
            queryParams: {
                name: this.filterText?.toLowerCase()
            }
        });
        this.name.emit(this.filterText);
    }
}
