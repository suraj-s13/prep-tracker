// ============================================================
// data.js — All application data extracted from Excel tracker
// ============================================================

const QUESTIONS = [
  // ── Arrays ──────────────────────────────────────────────
  { id: 1,  name: "Two Sum",                                topic: "Arrays",        difficulty: "Easy",   lc: "#1",    pattern: "HashMap — complement lookup" },
  { id: 2,  name: "Best Time to Buy and Sell Stock",        topic: "Arrays",        difficulty: "Easy",   lc: "#121",  pattern: "Sliding window min price" },
  { id: 3,  name: "Contains Duplicate",                     topic: "Arrays",        difficulty: "Easy",   lc: "#217",  pattern: "HashSet" },
  { id: 4,  name: "Product of Array Except Self",           topic: "Arrays",        difficulty: "Medium", lc: "#238",  pattern: "Prefix + suffix product" },
  { id: 5,  name: "Maximum Subarray",                       topic: "Arrays",        difficulty: "Medium", lc: "#53",   pattern: "Kadane's algorithm" },
  { id: 6,  name: "Maximum Product Subarray",               topic: "Arrays",        difficulty: "Medium", lc: "#152",  pattern: "Track min/max" },
  { id: 7,  name: "Find Min in Rotated Sorted Array",       topic: "Arrays",        difficulty: "Medium", lc: "#153",  pattern: "Binary search" },
  { id: 8,  name: "Search in Rotated Sorted Array",         topic: "Arrays",        difficulty: "Medium", lc: "#33",   pattern: "Binary search with pivot" },
  { id: 9,  name: "3Sum",                                   topic: "Arrays",        difficulty: "Medium", lc: "#15",   pattern: "Sort + two pointers" },
  { id: 10, name: "Container With Most Water",              topic: "Arrays",        difficulty: "Medium", lc: "#11",   pattern: "Two pointers" },
  // ── Strings ─────────────────────────────────────────────
  { id: 11, name: "Valid Anagram",                          topic: "Strings",       difficulty: "Easy",   lc: "#242",  pattern: "Char frequency count" },
  { id: 12, name: "Valid Palindrome",                       topic: "Strings",       difficulty: "Easy",   lc: "#125",  pattern: "Two pointers" },
  { id: 13, name: "Longest Substring Without Repeating Chars", topic: "Strings",   difficulty: "Medium", lc: "#3",    pattern: "Sliding window + set" },
  { id: 14, name: "Longest Repeating Char Replacement",    topic: "Strings",       difficulty: "Medium", lc: "#424",  pattern: "Sliding window" },
  { id: 15, name: "Group Anagrams",                         topic: "Strings",       difficulty: "Medium", lc: "#49",   pattern: "Sorted key hashmap" },
  { id: 16, name: "Minimum Window Substring",               topic: "Strings",       difficulty: "Hard",   lc: "#76",   pattern: "Sliding window + freq map" },
  { id: 17, name: "Valid Parentheses",                      topic: "Strings",       difficulty: "Easy",   lc: "#20",   pattern: "Stack" },
  { id: 18, name: "Palindromic Substrings",                 topic: "Strings",       difficulty: "Medium", lc: "#647",  pattern: "Expand around center" },
  // ── Binary Search ────────────────────────────────────────
  { id: 19, name: "Binary Search",                          topic: "Binary Search", difficulty: "Easy",   lc: "#704",  pattern: "Classic binary search" },
  { id: 20, name: "Search a 2D Matrix",                     topic: "Binary Search", difficulty: "Medium", lc: "#74",   pattern: "Treat as 1D sorted array" },
  { id: 21, name: "Koko Eating Bananas",                    topic: "Binary Search", difficulty: "Medium", lc: "#875",  pattern: "Binary search on answer" },
  { id: 22, name: "Time Based Key-Value Store",             topic: "Binary Search", difficulty: "Medium", lc: "#981",  pattern: "Binary search on timestamps" },
  { id: 23, name: "Median of Two Sorted Arrays",            topic: "Binary Search", difficulty: "Hard",   lc: "#4",    pattern: "Binary search on partition" },
  { id: 24, name: "Find Minimum in Rotated Sorted Array",   topic: "Binary Search", difficulty: "Medium", lc: "#153",  pattern: "Binary search with pivot" },
  // ── Trees ────────────────────────────────────────────────
  { id: 25, name: "Invert Binary Tree",                     topic: "Trees",         difficulty: "Easy",   lc: "#226",  pattern: "Recursive swap" },
  { id: 26, name: "Maximum Depth of Binary Tree",           topic: "Trees",         difficulty: "Easy",   lc: "#104",  pattern: "DFS recursion" },
  { id: 27, name: "Same Tree",                              topic: "Trees",         difficulty: "Easy",   lc: "#100",  pattern: "Recursive comparison" },
  { id: 28, name: "Subtree of Another Tree",                topic: "Trees",         difficulty: "Easy",   lc: "#572",  pattern: "Recursive same tree check" },
  { id: 29, name: "Lowest Common Ancestor of BST",          topic: "Trees",         difficulty: "Medium", lc: "#235",  pattern: "BST property navigation" },
  { id: 30, name: "Binary Tree Level Order Traversal",      topic: "Trees",         difficulty: "Medium", lc: "#102",  pattern: "BFS with queue" },
  { id: 31, name: "Validate Binary Search Tree",            topic: "Trees",         difficulty: "Medium", lc: "#98",   pattern: "Inorder traversal" },
  { id: 32, name: "Kth Smallest Element in BST",            topic: "Trees",         difficulty: "Medium", lc: "#230",  pattern: "Inorder traversal" },
  { id: 33, name: "Construct Tree from Preorder+Inorder",   topic: "Trees",         difficulty: "Medium", lc: "#105",  pattern: "Divide and conquer" },
  { id: 34, name: "Binary Tree Max Path Sum",               topic: "Trees",         difficulty: "Hard",   lc: "#124",  pattern: "DFS with global max" },
  { id: 35, name: "Serialize and Deserialize Binary Tree",  topic: "Trees",         difficulty: "Hard",   lc: "#297",  pattern: "BFS/DFS + string parsing" },
  // ── Graphs ───────────────────────────────────────────────
  { id: 36, name: "Number of Islands",                      topic: "Graphs",        difficulty: "Medium", lc: "#200",  pattern: "DFS/BFS flood fill" },
  { id: 37, name: "Clone Graph",                            topic: "Graphs",        difficulty: "Medium", lc: "#133",  pattern: "DFS + hashmap" },
  { id: 38, name: "Pacific Atlantic Water Flow",            topic: "Graphs",        difficulty: "Medium", lc: "#417",  pattern: "Reverse BFS from both coasts" },
  { id: 39, name: "Course Schedule",                        topic: "Graphs",        difficulty: "Medium", lc: "#207",  pattern: "Topological sort / cycle detect" },
  { id: 40, name: "Number of Connected Components",         topic: "Graphs",        difficulty: "Medium", lc: "#323",  pattern: "Union Find or DFS" },
  { id: 41, name: "Graph Valid Tree",                       topic: "Graphs",        difficulty: "Medium", lc: "#261",  pattern: "Union Find + edge count" },
  { id: 42, name: "Alien Dictionary",                       topic: "Graphs",        difficulty: "Hard",   lc: "#269",  pattern: "Topological sort" },
  { id: 43, name: "Word Ladder",                            topic: "Graphs",        difficulty: "Hard",   lc: "#127",  pattern: "BFS shortest path" },
  // ── Dynamic Programming ──────────────────────────────────
  { id: 44, name: "Climbing Stairs",                        topic: "Dynamic Prog.", difficulty: "Easy",   lc: "#70",   pattern: "Fibonacci pattern" },
  { id: 45, name: "House Robber",                           topic: "Dynamic Prog.", difficulty: "Medium", lc: "#198",  pattern: "1D DP" },
  { id: 46, name: "House Robber II",                        topic: "Dynamic Prog.", difficulty: "Medium", lc: "#213",  pattern: "Circular array DP" },
  { id: 47, name: "Longest Palindromic Substring",          topic: "Dynamic Prog.", difficulty: "Medium", lc: "#5",    pattern: "Expand around center" },
  { id: 48, name: "Palindromic Substrings (DP)",            topic: "Dynamic Prog.", difficulty: "Medium", lc: "#647",  pattern: "Expand / DP table" },
  { id: 49, name: "Coin Change",                            topic: "Dynamic Prog.", difficulty: "Medium", lc: "#322",  pattern: "Bottom-up DP" },
  { id: 50, name: "Maximum Product Subarray (DP)",          topic: "Dynamic Prog.", difficulty: "Medium", lc: "#152",  pattern: "Track min and max" },
  { id: 51, name: "Word Break",                             topic: "Dynamic Prog.", difficulty: "Medium", lc: "#139",  pattern: "DP with dictionary set" },
  { id: 52, name: "Combination Sum IV",                     topic: "Dynamic Prog.", difficulty: "Medium", lc: "#377",  pattern: "Order-matters DP" },
  { id: 53, name: "Unique Paths",                           topic: "Dynamic Prog.", difficulty: "Medium", lc: "#62",   pattern: "2D DP grid" },
  { id: 54, name: "Jump Game",                              topic: "Dynamic Prog.", difficulty: "Medium", lc: "#55",   pattern: "Greedy / DP" },
  { id: 55, name: "Longest Increasing Subsequence",         topic: "Dynamic Prog.", difficulty: "Medium", lc: "#300",  pattern: "DP O(n²) or patience sort" },
  { id: 56, name: "Longest Common Subsequence",             topic: "Dynamic Prog.", difficulty: "Medium", lc: "#1143", pattern: "2D DP" },
  // ── Linked List ──────────────────────────────────────────
  { id: 57, name: "Reverse Linked List",                    topic: "Linked List",   difficulty: "Easy",   lc: "#206",  pattern: "Iterative / recursive" },
  { id: 58, name: "Merge Two Sorted Lists",                 topic: "Linked List",   difficulty: "Easy",   lc: "#21",   pattern: "Dummy head merge" },
  { id: 59, name: "Linked List Cycle",                      topic: "Linked List",   difficulty: "Easy",   lc: "#141",  pattern: "Floyd's slow/fast pointers" },
  { id: 60, name: "Reorder List",                           topic: "Linked List",   difficulty: "Medium", lc: "#143",  pattern: "Find mid + reverse + merge" },
  { id: 61, name: "Remove Nth Node From End",               topic: "Linked List",   difficulty: "Medium", lc: "#19",   pattern: "Two pointers gap n" },
  { id: 62, name: "Find The Duplicate Number",              topic: "Linked List",   difficulty: "Medium", lc: "#287",  pattern: "Floyd's cycle detection" },
  { id: 63, name: "Merge K Sorted Lists",                   topic: "Linked List",   difficulty: "Hard",   lc: "#23",   pattern: "Min heap / divide & conquer" },
  { id: 64, name: "LRU Cache",                              topic: "Linked List",   difficulty: "Medium", lc: "#146",  pattern: "HashMap + doubly linked list" },
  // ── Heap / Queue ─────────────────────────────────────────
  { id: 65, name: "Kth Largest Element in Array",           topic: "Heap/Queue",    difficulty: "Medium", lc: "#215",  pattern: "Min heap of size k" },
  { id: 66, name: "Top K Frequent Elements",                topic: "Heap/Queue",    difficulty: "Medium", lc: "#347",  pattern: "Bucket sort / heap" },
  { id: 67, name: "Find Median from Data Stream",           topic: "Heap/Queue",    difficulty: "Hard",   lc: "#295",  pattern: "Two heaps (max+min)" },
  { id: 68, name: "Task Scheduler",                         topic: "Heap/Queue",    difficulty: "Medium", lc: "#621",  pattern: "Greedy with max heap" },
  { id: 69, name: "Design Twitter",                         topic: "Heap/Queue",    difficulty: "Medium", lc: "#355",  pattern: "OOP + min heap" },
];

const STUDY_PLAN = [
  // Phase 1
  { id: "w1",  phase: "Phase 1 · Month 1–6",   period: "Week 1–2",   topic: "Arrays & Strings basics",          tasks: "Solve 2 Easy/day on LeetCode",           resources: "NeetCode.io + YouTube",               status: "Not Started" },
  { id: "w2",  phase: "Phase 1 · Month 1–6",   period: "Week 3–4",   topic: "HashMaps & Two Pointers",           tasks: "Solve 2 Medium/day",                     resources: "Striver A2Z Sheet",                   status: "Not Started" },
  { id: "w3",  phase: "Phase 1 · Month 1–6",   period: "Week 5–6",   topic: "Sliding Window",                    tasks: "3 problems/day, review patterns",         resources: "NeetCode playlist",                   status: "Not Started" },
  { id: "w4",  phase: "Phase 1 · Month 1–6",   period: "Week 7–8",   topic: "Binary Search",                     tasks: "Master template, 2 problems/day",         resources: "LeetCode explore",                    status: "Not Started" },
  { id: "w5",  phase: "Phase 1 · Month 1–6",   period: "Week 9–12",  topic: "Recursion + Stack/Queue",           tasks: "1 problem + revise previous",            resources: "Abdul Bari YouTube",                  status: "Not Started" },
  { id: "w6",  phase: "Phase 1 · Month 1–6",   period: "Week 13–16", topic: "Linked Lists",                      tasks: "2 problems/day",                         resources: "NeetCode + Striver",                  status: "Not Started" },
  { id: "w7",  phase: "Phase 1 · Month 1–6",   period: "Week 17–20", topic: "Trees (BFS + DFS)",                 tasks: "2 problems/day",                         resources: "NeetCode Tree playlist",              status: "Not Started" },
  { id: "w8",  phase: "Phase 1 · Month 1–6",   period: "Week 21–24", topic: "Heaps + Revision",                  tasks: "Revise all topics, mock test",           resources: "LeetCode weekly contest",             status: "Not Started" },
  // Phase 2
  { id: "w9",  phase: "Phase 2 · Month 7–12",  period: "Week 25–28", topic: "Graphs (BFS/DFS/Union Find)",       tasks: "2 Mediums/day",                          resources: "Striver Graph Series",                status: "Not Started" },
  { id: "w10", phase: "Phase 2 · Month 7–12",  period: "Week 29–36", topic: "Dynamic Programming",               tasks: "1 DP/day + understand patterns",         resources: "Aditya Verma DP Playlist",            status: "Not Started" },
  { id: "w11", phase: "Phase 2 · Month 7–12",  period: "Week 37–40", topic: "System Design basics",              tasks: "30 min reading/day",                     resources: "Alex Xu Book Vol 1",                  status: "Not Started" },
  { id: "w12", phase: "Phase 2 · Month 7–12",  period: "Week 41–44", topic: "System Design practice",            tasks: "Design 1 system/week",                   resources: "Grokking SD Interview",               status: "Not Started" },
  { id: "w13", phase: "Phase 2 · Month 7–12",  period: "Week 45–48", topic: "Mock Interviews",                   tasks: "2 mocks/week on Pramp",                  resources: "Pramp.com / Interviewing.io",          status: "Not Started" },
  // Phase 3
  { id: "w14", phase: "Phase 3 · Month 13–18", period: "Week 49–52", topic: "Company-specific prep",             tasks: "LeetCode tagged by company",             resources: "LeetCode Premium company tags",        status: "Not Started" },
  { id: "w15", phase: "Phase 3 · Month 13–18", period: "Week 53–56", topic: "Behavioural (STAR method)",         tasks: "Prepare 5 STAR stories",                 resources: "Amazon Leadership Principles",         status: "Not Started" },
  { id: "w16", phase: "Phase 3 · Month 13–18", period: "Week 57–60", topic: "Full mock rounds",                  tasks: "4-hr full interview simulation",         resources: "Interviewing.io",                     status: "Not Started" },
  { id: "w17", phase: "Phase 3 · Month 13–18", period: "Week 61–64", topic: "Apply + Negotiate",                 tasks: "Apply to 20+ companies",                 resources: "LinkedIn + Referrals",                status: "Not Started" },
  // Phase 4
  { id: "w18", phase: "Phase 4 · Month 18+",   period: "Week 65–72", topic: "Google/Meta Hard problems",         tasks: "1 Hard/day + review",                    resources: "LeetCode Hard tagged Google",          status: "Not Started" },
  { id: "w19", phase: "Phase 4 · Month 18+",   period: "Week 73–80", topic: "Advanced System Design",            tasks: "Distributed systems deep dive",          resources: "DDIA Book + Designing DS",            status: "Not Started" },
  { id: "w20", phase: "Phase 4 · Month 18+",   period: "Week 80+",   topic: "Final applications",                tasks: "Apply with referral",                    resources: "Internal referral + LinkedIn",         status: "Not Started" },
];

const RESOURCES = [
  // DSA
  { id: "r1",  name: "LeetCode",                  description: "Primary coding practice platform",                        category: "DSA",   url: "https://leetcode.com" },
  { id: "r2",  name: "NeetCode.io",               description: "Blind 75 with clear video explanations",                 category: "DSA",   url: "https://neetcode.io" },
  { id: "r3",  name: "Striver A2Z DSA Sheet",     description: "Complete DSA roadmap by TakeUForward",                   category: "DSA",   url: "https://takeuforward.org" },
  { id: "r4",  name: "InterviewBit",              description: "Interview-focused coding practice",                       category: "DSA",   url: "https://www.interviewbit.com" },
  // System Design
  { id: "r5",  name: "Alex Xu Book",              description: "System Design Interview Vol 1 & 2 — must read",          category: "System Design", url: "" },
  { id: "r6",  name: "Grokking SD Interview",     description: "Visual system design course on Educative.io",            category: "System Design", url: "https://www.educative.io" },
  { id: "r7",  name: "DDIA Book",                 description: "Designing Data-Intensive Applications by Kleppmann",     category: "System Design", url: "" },
  // Mock
  { id: "r8",  name: "Pramp",                     description: "Free peer-to-peer mock interviews",                      category: "Mock Interviews", url: "https://www.pramp.com" },
  { id: "r9",  name: "Interviewing.io",           description: "Mock interviews with real engineers anonymously",        category: "Mock Interviews", url: "https://interviewing.io" },
  // Video
  { id: "r10", name: "NeetCode YouTube",          description: "Best DSA explanations with clean code walkthroughs",     category: "YouTube", url: "https://youtube.com/@NeetCode" },
  { id: "r11", name: "Abdul Bari",                description: "In-depth algorithms & data structures lectures",         category: "YouTube", url: "https://youtube.com" },
  { id: "r12", name: "Aditya Verma",              description: "Best DP playlist in Hindi/English — highly recommended", category: "YouTube", url: "https://youtube.com" },
  // Certifications
  { id: "r13", name: "AWS Cloud Practitioner",    description: "Foundational cloud cert — free tier available",          category: "Certifications", url: "https://aws.amazon.com" },
  { id: "r14", name: "AWS Solutions Architect",   description: "Strongly valued at big tech companies",                  category: "Certifications", url: "https://aws.amazon.com" },
];

// Topic colour map used across the app
const TOPIC_COLORS = {
  "Arrays":         "#6366f1",
  "Strings":        "#ec4899",
  "Binary Search":  "#f59e0b",
  "Trees":          "#10b981",
  "Graphs":         "#3b82f6",
  "Dynamic Prog.":  "#8b5cf6",
  "Linked List":    "#f97316",
  "Heap/Queue":     "#14b8a6",
};

const DIFFICULTY_COLORS = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444" };
