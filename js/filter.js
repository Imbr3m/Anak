// Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile filter toggle
    const filterToggle = document.querySelector('.filter-toggle');
    const filters = document.querySelector('.filters');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            filters.classList.toggle('show');
        });
    }

    // Clear all filters
    const clearAllBtn = document.querySelector('.clear-all');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = false);
            
            // Clear active filter tags
            const activeFilters = document.querySelector('.active-filters');
            activeFilters.innerHTML = '';
            
            // Trigger filter update
            updateFilters();
        });
    }

    // Remove individual filter tags
    document.querySelector('.active-filters').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-tag')) {
            const tag = e.target.closest('.filter-tag');
            const filterText = tag.querySelector('span').textContent;
            
            // Uncheck corresponding checkbox
            const checkbox = findCheckboxByLabel(filterText);
            if (checkbox) checkbox.checked = false;
            
            // Remove tag
            tag.remove();
            
            // Trigger filter update
            updateFilters();
        }
    });

    // Handle checkbox changes
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateFilters();
        });
    });

    // Search functionality
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filterSection = e.target.closest('.filter-section');
            const options = filterSection.querySelectorAll('.checkbox-label');
            
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                option.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    });

    // Helper function to find checkbox by label text
    function findCheckboxByLabel(text) {
        const labels = document.querySelectorAll('.checkbox-label');
        for (const label of labels) {
            if (label.textContent.includes(text)) {
                return label.querySelector('input[type="checkbox"]');
            }
        }
        return null;
    }

    // Update filters and active tags
    function updateFilters() {
        const activeFilters = document.querySelector('.active-filters');
        activeFilters.innerHTML = '';
        
        // Get all checked checkboxes
        const checkedBoxes = document.querySelectorAll('.filter-options input[type="checkbox"]:checked');
        
        checkedBoxes.forEach(checkbox => {
            const label = checkbox.closest('.checkbox-label').textContent.trim();
            const tag = createFilterTag(label);
            activeFilters.appendChild(tag);
        });
        
        // Here you would typically update the product display based on selected filters
        filterProducts();
    }

    // Create a new filter tag element
    function createFilterTag(text) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `
            <span>${text}</span>
            <button class="remove-tag">×</button>
        `;
        return tag;
    }

    // Filter products based on selected options
    function filterProducts() {
        // Get all selected filters
        const selectedBrands = getSelectedValues('Brand');
        const selectedPrices = getSelectedValues('Price');
        const selectedColors = getSelectedValues('Color');
        const selectedDiscounts = getSelectedValues('Discount Range');

        // Get all products
        const products = document.querySelectorAll('.product__item');

        // Filter products based on selected criteria
        products.forEach(product => {
            const brand = product.dataset.brand;
            const price = parseFloat(product.dataset.price);
            const color = product.dataset.color;
            const discount = parseFloat(product.dataset.discount);

            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
            const matchesPrice = selectedPrices.length === 0 || matchesPriceRange(price, selectedPrices);
            const matchesColor = selectedColors.length === 0 || selectedColors.includes(color);
            const matchesDiscount = selectedDiscounts.length === 0 || matchesDiscountRange(discount, selectedDiscounts);

            product.style.display = matchesBrand && matchesPrice && matchesColor && matchesDiscount ? '' : 'none';
        });

        // Update total count
        updateProductCount();
    }

    // Helper function to get selected values for a filter section
    function getSelectedValues(sectionTitle) {
        const section = Array.from(document.querySelectorAll('.filter-section')).find(section => 
            section.querySelector('h3').textContent === sectionTitle
        );
        if (!section) return [];

        return Array.from(section.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => 
            checkbox.closest('.checkbox-label').textContent.trim()
        );
    }

    // Helper function to check if a price matches any selected price range
    function matchesPriceRange(price, selectedRanges) {
        return selectedRanges.some(range => {
            const [min, max] = range.match(/\d+/g).map(Number);
            return price >= min && price <= max;
        });
    }

    // Helper function to check if a discount matches any selected discount range
    function matchesDiscountRange(discount, selectedRanges) {
        return selectedRanges.some(range => {
            const minDiscount = parseInt(range.match(/\d+/)[0]);
            return discount >= minDiscount;
        });
    }

    // Update the total product count
    function updateProductCount() {
        const visibleProducts = document.querySelectorAll('.product__item[style=""]').length;
        const totalProducts = document.querySelector('.total__products span');
        if (totalProducts) {
            totalProducts.textContent = visibleProducts;
        }
    }

    // Initialize filters
    updateFilters();
}); 