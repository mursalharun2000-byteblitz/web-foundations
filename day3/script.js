// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  return notes.reduce((longest, current) => {
    return current.text.length > longest.text.length ? current : longest;
  });
}

// 3. countByCategory
function countByCategory() {
  const counts = {};
  for (let note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";
  
  const categoryStrings = Object.entries(counts).map(([category, count]) => `${count} ${category}`);
  return `${total} ${noteWord}: ${categoryStrings.join(", ")}.`;
}

// 5. isDuplicate
function isDuplicate(text) {
  const normalized = text.toLowerCase().trim();
  return notes.some(note => note.text.toLowerCase().trim() === normalized);
}

// 6. addNote
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmed = text.trim();
  
  // Check length
  if (trimmed.length < 1 || trimmed.length > 200) {
    console.log("Failed to add: Note length must be between 1 and 200 characters.");
    return false;
  }
  
  // Check valid category
  if (!validCategories.includes(category)) {
    console.log("Failed to add: Category must be 'personal', 'work', or 'study'.");
    return false;
  }
  
  // Check duplicate
  if (isDuplicate(text)) {
    console.log("Failed to add: Note is a duplicate.");
    return false;
  }
  
  // Add note to array (generating a new ID based on the highest existing ID)
  const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: trimmed, category });
  return true;
}

// --- CONSOLE TESTS ---

console.log("--- searchNotes ---");
console.log(searchNotes("javascript")); // Expected output: [{ id: 4, text: 'Revise JavaScript arrays', category: 'study' }]
console.log(searchNotes("guitar")); // Expected output: [] (Edge case: term not found)

console.log("\n--- longestNote ---");
console.log(longestNote()); // Expected output: { id: 3, text: 'Email the project report to Grace', category: 'work' }

// Edge case setup: Test longestNote with an empty array
const backupNotes = [...notes];
notes = [];
console.log(longestNote()); // Expected output: null
notes = [...backupNotes]; // Restore array

console.log("\n--- countByCategory ---");
console.log(countByCategory()); // Expected output: { personal: 2, study: 2, work: 1 }
notes.push({ id: 99, text: "Gym", category: "personal" });
console.log(countByCategory()); // Expected output: { personal: 3, study: 2, work: 1 } (Edge case: verifies it scales dynamically)
notes.pop(); // Remove the temp gym note

console.log("\n--- getSummary ---");
console.log(getSummary()); // Expected output: "5 notes: 2 personal, 2 study, 1 work."

// Edge case setup: Test singular "note" grammar
notes = [{ id: 1, text: "Solo task", category: "work" }];
console.log(getSummary()); // Expected output: "1 note: 1 work."
notes = [...backupNotes]; // Restore array

console.log("\n--- isDuplicate ---");
console.log(isDuplicate("Walk the dog")); // Expected output: false
console.log(isDuplicate("  cAlL mUm   ")); // Expected output: true (Edge case: ignores weird casing and extra spaces)

console.log("\n--- addNote ---");
console.log(addNote("Walk the dog", "personal")); // Expected output: true (Successfully adds to the array)
console.log(addNote("Call mum", "personal")); // Expected output: false (Logs reason: duplicate)
console.log(addNote("", "study")); // Expected output: false (Logs reason: length)
console.log(addNote("Learn React", "hobby")); // Expected output: false (Logs reason: invalid category)