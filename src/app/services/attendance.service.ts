import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private collectionName='attendance';

  constructor(private firestore: AngularFirestore) {}
  // Create - Add a new document to Firestore
  create(data: any): Promise<any> {
    const timestamp = new Date().getTime();  // Get current timestamp
    const dataWithTimestamp = { ...data, uploadedAt: timestamp };  // Add timestamp to data
    return this.firestore.collection(this.collectionName).add(dataWithTimestamp);
  }

  // Read - Get all documents from Firestore
  getAll(): Observable<any[]> {
    return this.firestore.collection(this.collectionName, ref => ref.orderBy('uploadedAt')).valueChanges();
  }

  // Read - Get a document by ID
  getById(id: string): Observable<any> {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }

  // Update - Update a document by ID
  update(id: string, data: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(data);
  }

  // Delete - Delete a document by ID
  delete(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }

  // Query - Get documents uploaded after a specific timestamp
  getByUploadedTime(timestamp: number): Observable<any[]> {
    return this.firestore.collection(this.collectionName, ref => ref.where('uploadedAt', '>', timestamp).orderBy('uploadedAt')).valueChanges();
  }

  getByUserAndDay(userId: string, day: Date): Observable<any> {
    // Get the start and end of the day for comparison (ignoring time)
    const startOfDay = this.getStartOfDay(day);
    const endOfDay = this.getEndOfDay(day);

    return this.firestore.collection(this.collectionName, ref => 
      ref
        .where('userId', '==', userId)  // Filter by userId
        .where('attendanceDate', '>=', startOfDay)  // Filter by date >= start of the day
        .where('attendanceDate', '<=', endOfDay)    // Filter by date <= end of the day
        .orderBy('attendanceDate')  // Order by attendanceDate (just for consistency)
        .limit(1)  // Only fetch one document (as the user can sign in only once a day)
      ).valueChanges().pipe(
        // If no record is found, return null
        map(records => records.length > 0 ? records[0] : null)
      );
    }
  
    // Helper function to get the start of the day (midnight)
    private getStartOfDay(date: Date): number {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);  // Set to midnight (start of the day)
      return startOfDay.getTime();
    }
  
    // Helper function to get the end of the day (just before midnight)
    private getEndOfDay(date: Date): number {
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);  // Set to just before midnight (end of the day)
      return endOfDay.getTime();
    }
}
