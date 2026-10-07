/**
 * CampusCore - Student Management Portal
 * Frontend Client Application
 */

(function () {
  'use strict';

  // --- Configuration & State ---
  const API_BASE = '/students';

  const state = {
    students: [],
    filteredStudents: [],
    selectedDepartment: 'all',
    searchQuery: '',
    viewMode: localStorage.getItem('campus_view_mode') || 'grid',
    theme: localStorage.getItem('campus_theme') || 'dark',
    activeStudentForDelete: null,
    activeStudentForDetails: null,
    editingStudentId: null
  };

  // --- DOM Elements ---
  const elements = {
    // Nav & Theme
    themeToggleBtn: document.getElementById('btnThemeToggle'),
    quickIdInput: document.getElementById('quickIdInput'),
    btnQuickFind: document.getElementById('btnQuickFind'),
    btnOpenAddModal: document.getElementById('btnOpenAddModal'),
    serverStatusDot: document.getElementById('serverStatusDot'),
    serverStatusText: document.getElementById('serverStatusText'),

    // Metrics
    metricTotalStudents: document.getElementById('metricTotalStudents'),
    metricTotalDepts: document.getElementById('metricTotalDepts'),
    metricAvgAge: document.getElementById('metricAvgAge'),

    // Toolbar & Filters
    searchInput: document.getElementById('searchInput'),
    btnClearSearch: document.getElementById('btnClearSearch'),
    btnRefreshList: document.getElementById('btnRefreshList'),
    refreshIcon: document.getElementById('refreshIcon'),
    btnViewGrid: document.getElementById('btnViewGrid'),
    btnViewTable: document.getElementById('btnViewTable'),
    deptFilterBar: document.getElementById('deptFilterBar'),

    // Containers
    studentsGridContainer: document.getElementById('studentsGridContainer'),
    studentsTableContainer: document.getElementById('studentsTableContainer'),
    studentsTableBody: document.getElementById('studentsTableBody'),
    emptyState: document.getElementById('emptyState'),
    emptyStateTitle: document.getElementById('emptyStateTitle'),
    emptyStateDesc: document.getElementById('emptyStateDesc'),
    btnEmptyAdd: document.getElementById('btnEmptyAdd'),

    // Form Modal
    studentFormModal: document.getElementById('studentFormModal'),
    btnCloseFormModal: document.getElementById('btnCloseFormModal'),
    btnCancelForm: document.getElementById('btnCancelForm'),
    studentForm: document.getElementById('studentForm'),
    formModalTitle: document.getElementById('formModalTitle'),
    formStudentId: document.getElementById('formStudentId'),
    formName: document.getElementById('formName'),
    formAge: document.getElementById('formAge'),
    formDeptId: document.getElementById('formDeptId'),
    formDeptName: document.getElementById('formDeptName'),
    deptSuggestions: document.getElementById('deptSuggestions'),
    btnSubmitText: document.getElementById('btnSubmitText'),
    nameError: document.getElementById('nameError'),
    ageError: document.getElementById('ageError'),
    deptIdError: document.getElementById('deptIdError'),

    // Details Modal
    studentDetailsModal: document.getElementById('studentDetailsModal'),
    btnCloseDetailsModal: document.getElementById('btnCloseDetailsModal'),
    detailsAvatar: document.getElementById('detailsAvatar'),
    detailsName: document.getElementById('detailsName'),
    detailsIdTag: document.getElementById('detailsIdTag'),
    detailsDeptName: document.getElementById('detailsDeptName'),
    detailsDeptId: document.getElementById('detailsDeptId'),
    detailsAge: document.getElementById('detailsAge'),
    btnDetailsEdit: document.getElementById('btnDetailsEdit'),
    btnDetailsDelete: document.getElementById('btnDetailsDelete'),

    // Delete Modal
    deleteConfirmModal: document.getElementById('deleteConfirmModal'),
    btnCloseDeleteModal: document.getElementById('btnCloseDeleteModal'),
    btnCancelDelete: document.getElementById('btnCancelDelete'),
    btnConfirmDelete: document.getElementById('btnConfirmDelete'),
    deleteTargetName: document.getElementById('deleteTargetName'),
    deleteTargetId: document.getElementById('deleteTargetId'),

    // Toast
    toastContainer: document.getElementById('toastContainer')
  };

  // --- Helper Functions ---

  function showToast(message, type = 'info', duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${escapeHtml(message)}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // --- Theme Handling ---
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('campus_theme', state.theme);
    showToast(`Switched to ${state.theme} theme`, 'info', 1500);
  }

  // --- API Communications ---

  async function loadStudents() {
    elements.refreshIcon.style.animation = 'spin 0.6s linear infinite';
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
      const data = await res.json();
      state.students = Array.isArray(data) ? data : [];
      updateStatus(true);
      applyFilters();
      updateMetrics();
      updateDeptFilters();
    } catch (err) {
      console.error('Failed to fetch students:', err);
      updateStatus(false);
      showToast('Could not load student list. Is backend running?', 'error');
    } finally {
      elements.refreshIcon.style.animation = '';
    }
  }

  function updateStatus(isOnline) {
    if (isOnline) {
      elements.serverStatusDot.style.backgroundColor = 'var(--accent-emerald)';
      elements.serverStatusDot.style.boxShadow = '0 0 8px var(--accent-emerald)';
      elements.serverStatusText.textContent = 'System Active';
    } else {
      elements.serverStatusDot.style.backgroundColor = 'var(--accent-rose)';
      elements.serverStatusDot.style.boxShadow = '0 0 8px var(--accent-rose)';
      elements.serverStatusText.textContent = 'Offline';
    }
  }

  async function fetchStudentById(id) {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Student #${id} not found.`);
        }
        throw new Error(`Failed to fetch student #${id} (HTTP ${res.status})`);
      }
      return await res.json();
    } catch (err) {
      showToast(err.message, 'error');
      return null;
    }
  }

  async function saveStudent(payload, isEdit, studentId) {
    const url = isEdit ? `${API_BASE}/${studentId}` : API_BASE;
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      if (errorData) {
        // If Spring Boot validation returned field errors
        if (typeof errorData === 'object' && !errorData.error && !errorData.message) {
          const firstKey = Object.keys(errorData)[0];
          throw new Error(`${firstKey}: ${errorData[firstKey]}`);
        }
        throw new Error(errorData.error || errorData.message || 'Operation failed');
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  }

  async function executeDelete(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error((errorData && errorData.error) || 'Failed to delete student');
    }

    // Backend returns plain text message "Student deleted successfully"
    const message = await res.text();
    return message || 'Student deleted successfully';
  }

  // --- Filtering & Metrics ---

  function applyFilters() {
    const query = state.searchQuery.trim().toLowerCase();
    const dept = state.selectedDepartment;

    state.filteredStudents = state.students.filter(student => {
      const matchesSearch = !query ||
        (student.name && student.name.toLowerCase().includes(query)) ||
        String(student.id).includes(query);

      const deptName = (student.department && student.department.name) || '';
      const matchesDept = dept === 'all' || deptName.toLowerCase() === dept.toLowerCase();

      return matchesSearch && matchesDept;
    });

    renderStudents();
  }

  function updateMetrics() {
    elements.metricTotalStudents.textContent = state.students.length;

    // Unique departments
    const uniqueDepts = new Set();
    let totalAge = 0;

    state.students.forEach(s => {
      if (s.department && s.department.name) {
        uniqueDepts.add(s.department.name);
      }
      if (s.age) totalAge += s.age;
    });

    elements.metricTotalDepts.textContent = uniqueDepts.size;

    if (state.students.length > 0) {
      const avg = (totalAge / state.students.length).toFixed(1);
      elements.metricAvgAge.textContent = `${avg} yrs`;
    } else {
      elements.metricAvgAge.textContent = '--';
    }
  }

  function updateDeptFilters() {
    const uniqueDepts = new Map();
    state.students.forEach(s => {
      if (s.department && s.department.name) {
        uniqueDepts.set(s.department.name, s.department.id);
      }
    });

    // Populate Datalist suggestions for modal form
    elements.deptSuggestions.innerHTML = '';
    uniqueDepts.forEach((id, name) => {
      const option = document.createElement('option');
      option.value = name;
      option.setAttribute('data-id', id);
      elements.deptSuggestions.appendChild(option);
    });

    // Populate filter chips
    const currentActive = state.selectedDepartment;
    elements.deptFilterBar.innerHTML = `
      <span class="filter-chip-label">Filter Department:</span>
      <button class="filter-chip ${currentActive === 'all' ? 'active' : ''}" data-dept="all">All Departments</button>
    `;

    uniqueDepts.forEach((_, name) => {
      const chip = document.createElement('button');
      chip.className = `filter-chip ${currentActive.toLowerCase() === name.toLowerCase() ? 'active' : ''}`;
      chip.setAttribute('data-dept', name);
      chip.textContent = name;
      elements.deptFilterBar.appendChild(chip);
    });
  }

  // --- Rendering UI ---

  function renderStudents() {
    const list = state.filteredStudents;

    if (list.length === 0) {
      elements.studentsGridContainer.style.display = 'none';
      elements.studentsTableContainer.style.display = 'none';
      elements.emptyState.style.display = 'block';

      if (state.searchQuery || state.selectedDepartment !== 'all') {
        elements.emptyStateTitle.textContent = 'No Matching Records';
        elements.emptyStateDesc.textContent = 'No students match your current search query or department filter.';
        elements.btnEmptyAdd.textContent = 'Clear Filters';
        elements.btnEmptyAdd.onclick = () => {
          state.searchQuery = '';
          state.selectedDepartment = 'all';
          elements.searchInput.value = '';
          elements.btnClearSearch.style.display = 'none';
          applyFilters();
          updateDeptFilters();
        };
      } else {
        elements.emptyStateTitle.textContent = 'No Students Registered';
        elements.emptyStateDesc.textContent = 'Get started by creating your first student record in CampusCore.';
        elements.btnEmptyAdd.textContent = '+ Add First Student';
        elements.btnEmptyAdd.onclick = openAddModal;
      }
      return;
    }

    elements.emptyState.style.display = 'none';

    if (state.viewMode === 'grid') {
      elements.studentsGridContainer.style.display = 'grid';
      elements.studentsTableContainer.style.display = 'none';
      renderGridView(list);
    } else {
      elements.studentsGridContainer.style.display = 'none';
      elements.studentsTableContainer.style.display = 'block';
      renderTableView(list);
    }
  }

  function renderGridView(list) {
    elements.studentsGridContainer.innerHTML = '';

    list.forEach(student => {
      const card = document.createElement('article');
      card.className = 'student-card';
      const deptName = (student.department && student.department.name) || 'General';
      const deptId = (student.department && student.department.id) || 'N/A';

      card.innerHTML = `
        <div>
          <div class="card-header-row">
            <div class="avatar-and-meta">
              <div class="student-avatar">${escapeHtml(getInitials(student.name))}</div>
              <div>
                <h3 class="student-card-title">${escapeHtml(student.name)}</h3>
                <span class="student-id-tag">ID: #${student.id}</span>
              </div>
            </div>
          </div>

          <div class="card-badges">
            <span class="badge badge-dept" title="Department">
              🏛️ ${escapeHtml(deptName)} (ID: ${escapeHtml(deptId)})
            </span>
            <span class="badge badge-age" title="Age">
              🎂 ${student.age} yrs
            </span>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn btn-secondary btn-card-view" data-id="${student.id}">View</button>
          <button class="btn btn-secondary btn-card-edit" data-id="${student.id}">Edit</button>
          <button class="btn btn-danger btn-card-delete" data-id="${student.id}">Delete</button>
        </div>
      `;

      card.querySelector('.btn-card-view').addEventListener('click', () => openDetailsModal(student));
      card.querySelector('.btn-card-edit').addEventListener('click', () => openEditModal(student));
      card.querySelector('.btn-card-delete').addEventListener('click', () => openDeleteModal(student));

      elements.studentsGridContainer.appendChild(card);
    });
  }

  function renderTableView(list) {
    elements.studentsTableBody.innerHTML = '';

    list.forEach(student => {
      const tr = document.createElement('tr');
      const deptName = (student.department && student.department.name) || 'General';
      const deptId = (student.department && student.department.id) || 'N/A';

      tr.innerHTML = `
        <td style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--text-dim);">#${student.id}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div class="student-avatar" style="width: 32px; height: 32px; font-size: 0.8rem; border-radius: 8px;">
              ${escapeHtml(getInitials(student.name))}
            </div>
            <strong style="color: var(--text-main);">${escapeHtml(student.name)}</strong>
          </div>
        </td>
        <td>
          <span class="badge badge-dept">🏛️ ${escapeHtml(deptName)} (#${escapeHtml(deptId)})</span>
        </td>
        <td>
          <span class="badge badge-age">${student.age} yrs</span>
        </td>
        <td style="text-align: right;">
          <div style="display: inline-flex; gap: 0.4rem;">
            <button class="btn btn-secondary btn-tbl-view" data-id="${student.id}" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">View</button>
            <button class="btn btn-secondary btn-tbl-edit" data-id="${student.id}" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">Edit</button>
            <button class="btn btn-danger btn-tbl-delete" data-id="${student.id}" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">Delete</button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-tbl-view').addEventListener('click', () => openDetailsModal(student));
      tr.querySelector('.btn-tbl-edit').addEventListener('click', () => openEditModal(student));
      tr.querySelector('.btn-tbl-delete').addEventListener('click', () => openDeleteModal(student));

      elements.studentsTableBody.appendChild(tr);
    });
  }

  // --- Modal Controllers ---

  function openAddModal() {
    state.editingStudentId = null;
    elements.formModalTitle.textContent = 'Add New Student';
    elements.btnSubmitText.textContent = 'Save Student';
    elements.studentForm.reset();
    elements.formStudentId.value = '';
    clearValidationErrors();

    // Default dept suggestion if exists
    if (state.students.length > 0 && state.students[0].department) {
      elements.formDeptId.value = state.students[0].department.id || 1;
      elements.formDeptName.value = state.students[0].department.name || '';
    } else {
      elements.formDeptId.value = '1';
      elements.formDeptName.value = 'ECE';
    }

    elements.studentFormModal.classList.add('active');
    elements.formName.focus();
  }

  function openEditModal(student) {
    state.editingStudentId = student.id;
    elements.formModalTitle.textContent = `Edit Student #${student.id}`;
    elements.btnSubmitText.textContent = 'Update Student';
    clearValidationErrors();

    elements.formStudentId.value = student.id;
    elements.formName.value = student.name || '';
    elements.formAge.value = student.age || 20;
    elements.formDeptId.value = (student.department && student.department.id) || 1;
    elements.formDeptName.value = (student.department && student.department.name) || '';

    elements.studentFormModal.classList.add('active');
    elements.formName.focus();
  }

  function closeFormModal() {
    elements.studentFormModal.classList.remove('active');
    clearValidationErrors();
  }

  function clearValidationErrors() {
    elements.nameError.style.display = 'none';
    elements.ageError.style.display = 'none';
    elements.deptIdError.style.display = 'none';
  }

  function openDetailsModal(student) {
    state.activeStudentForDetails = student;
    elements.detailsAvatar.textContent = getInitials(student.name);
    elements.detailsName.textContent = student.name;
    elements.detailsIdTag.textContent = `ID: #${student.id}`;
    elements.detailsDeptName.textContent = (student.department && student.department.name) || 'Unassigned';
    elements.detailsDeptId.textContent = `#${(student.department && student.department.id) || 'N/A'}`;
    elements.detailsAge.textContent = `${student.age} years`;

    elements.studentDetailsModal.classList.add('active');
  }

  function closeDetailsModal() {
    elements.studentDetailsModal.classList.remove('active');
    state.activeStudentForDetails = null;
  }

  function openDeleteModal(student) {
    state.activeStudentForDelete = student;
    elements.deleteTargetName.textContent = student.name;
    elements.deleteTargetId.textContent = `Student ID: #${student.id}`;
    elements.deleteConfirmModal.classList.add('active');
  }

  function closeDeleteModal() {
    elements.deleteConfirmModal.classList.remove('active');
    state.activeStudentForDelete = null;
  }

  // --- Form Submission & Validation ---

  elements.studentForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearValidationErrors();

    const name = elements.formName.value.trim();
    const age = parseInt(elements.formAge.value, 10);
    const deptId = parseInt(elements.formDeptId.value, 10);
    const deptName = elements.formDeptName.value.trim();

    let hasError = false;

    if (!name) {
      elements.nameError.textContent = 'Name is required';
      elements.nameError.style.display = 'block';
      hasError = true;
    }

    if (isNaN(age) || age < 18 || age > 60) {
      elements.ageError.textContent = 'Age must be between 18 and 60';
      elements.ageError.style.display = 'block';
      hasError = true;
    }

    if (isNaN(deptId) || deptId < 1) {
      elements.deptIdError.textContent = 'Valid Department ID is required';
      elements.deptIdError.style.display = 'block';
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      name: name,
      age: age,
      department: {
        id: deptId,
        name: deptName || 'Department'
      }
    };

    elements.btnSubmitText.textContent = 'Saving...';
    elements.studentForm.querySelector('button[type="submit"]').disabled = true;

    try {
      const isEdit = Boolean(state.editingStudentId);
      const result = await saveStudent(payload, isEdit, state.editingStudentId);
      closeFormModal();
      showToast(isEdit ? `Updated student "${result.name}"` : `Added student "${result.name}"`, 'success');
      await loadStudents();
    } catch (err) {
      console.error(err);
      showToast(err.message, 'error');
    } finally {
      elements.studentForm.querySelector('button[type="submit"]').disabled = false;
      elements.btnSubmitText.textContent = state.editingStudentId ? 'Update Student' : 'Save Student';
    }
  });

  // Department name auto-suggest link
  elements.formDeptName.addEventListener('change', function () {
    const val = this.value.trim();
    const options = elements.deptSuggestions.querySelectorAll('option');
    for (let opt of options) {
      if (opt.value.toLowerCase() === val.toLowerCase()) {
        elements.formDeptId.value = opt.getAttribute('data-id');
        break;
      }
    }
  });

  // Delete Action Confirm
  elements.btnConfirmDelete.addEventListener('click', async function () {
    if (!state.activeStudentForDelete) return;
    const target = state.activeStudentForDelete;
    this.disabled = true;
    this.textContent = 'Deleting...';

    try {
      const message = await executeDelete(target.id);
      closeDeleteModal();
      if (elements.studentDetailsModal.classList.contains('active')) {
        closeDetailsModal();
      }
      showToast(message, 'success');
      await loadStudents();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      this.disabled = false;
      this.textContent = 'Delete Record';
    }
  });

  // --- Event Listeners ---

  // Nav actions
  elements.btnOpenAddModal.addEventListener('click', openAddModal);
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Quick Find by ID
  elements.btnQuickFind.addEventListener('click', async function () {
    const id = elements.quickIdInput.value.trim();
    if (!id) return;
    const student = await fetchStudentById(id);
    if (student) {
      openDetailsModal(student);
      elements.quickIdInput.value = '';
    }
  });

  elements.quickIdInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      elements.btnQuickFind.click();
    }
  });

  // Search Input
  elements.searchInput.addEventListener('input', function () {
    state.searchQuery = this.value;
    elements.btnClearSearch.style.display = this.value ? 'inline-flex' : 'none';
    applyFilters();
  });

  elements.btnClearSearch.addEventListener('click', function () {
    elements.searchInput.value = '';
    state.searchQuery = '';
    this.style.display = 'none';
    applyFilters();
  });

  elements.btnRefreshList.addEventListener('click', loadStudents);

  // View Mode switches
  elements.btnViewGrid.addEventListener('click', () => {
    state.viewMode = 'grid';
    localStorage.setItem('campus_view_mode', 'grid');
    elements.btnViewGrid.classList.add('active');
    elements.btnViewTable.classList.remove('active');
    renderStudents();
  });

  elements.btnViewTable.addEventListener('click', () => {
    state.viewMode = 'table';
    localStorage.setItem('campus_view_mode', 'table');
    elements.btnViewTable.classList.add('active');
    elements.btnViewGrid.classList.remove('active');
    renderStudents();
  });

  // Department Filter Chips delegate
  elements.deptFilterBar.addEventListener('click', function (e) {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    const dept = chip.getAttribute('data-dept');
    state.selectedDepartment = dept;

    const chips = elements.deptFilterBar.querySelectorAll('.filter-chip');
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    applyFilters();
  });

  // Modal Close buttons
  elements.btnCloseFormModal.addEventListener('click', closeFormModal);
  elements.btnCancelForm.addEventListener('click', closeFormModal);
  elements.btnCloseDetailsModal.addEventListener('click', closeDetailsModal);
  elements.btnCloseDeleteModal.addEventListener('click', closeDeleteModal);
  elements.btnCancelDelete.addEventListener('click', closeDeleteModal);

  // Detail Modal Actions
  elements.btnDetailsEdit.addEventListener('click', () => {
    if (state.activeStudentForDetails) {
      const student = state.activeStudentForDetails;
      closeDetailsModal();
      openEditModal(student);
    }
  });

  elements.btnDetailsDelete.addEventListener('click', () => {
    if (state.activeStudentForDetails) {
      const student = state.activeStudentForDetails;
      openDeleteModal(student);
    }
  });

  // Close Modals on Overlay Click
  [elements.studentFormModal, elements.studentDetailsModal, elements.deleteConfirmModal].forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Keyboard escape
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeFormModal();
      closeDetailsModal();
      closeDeleteModal();
    }
  });

  // --- Initial Launch ---
  function init() {
    initTheme();
    if (state.viewMode === 'table') {
      elements.btnViewTable.classList.add('active');
      elements.btnViewGrid.classList.remove('active');
    }
    loadStudents();
  }

  init();
})();
