// WALLET SYNC UTILITY - Add this script to all your HTML pages
// Place this in a separate file called "wallet-sync.js" and include it in all pages

(function() {
    'use strict';
    
    // Wallet Balance Manager
    window.WalletManager = {
        
        // Get current wallet balance
        getBalance: function() {
            try {
                let balance = sessionStorage.getItem('walletBalance');
                return balance ? parseFloat(balance) : 0;
            } catch (e) {
                console.error('Error getting wallet balance:', e);
                return 0;
            }
        },
        
        // Set wallet balance
        setBalance: function(amount) {
            try {
                sessionStorage.setItem('walletBalance', amount.toString());
                return true;
            } catch (e) {
                console.error('Error setting wallet balance:', e);
                return false;
            }
        },
        
        // Add money to wallet
        addMoney: function(amount) {
            let currentBalance = this.getBalance();
            let newBalance = currentBalance + parseFloat(amount);
            this.setBalance(newBalance);
            return newBalance;
        },
        
        // Format balance for display
        formatBalance: function(amount) {
            return `₹${parseFloat(amount).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        },
        
        // Update all wallet balance displays on the page
        updateDisplays: function() {
            let balance = this.getBalance();
            let formattedBalance = this.formatBalance(balance);
            
            // Update elements with class 'wallet-balance-display'
            document.querySelectorAll('.wallet-balance-display').forEach(el => {
                el.textContent = formattedBalance;
            });
            
            // Update elements with specific IDs
            const ids = ['walletBalance', 'dashboardWalletBalance', 'profileWalletBalance'];
            ids.forEach(id => {
                let element = document.getElementById(id);
                if (element) {
                    element.textContent = formattedBalance;
                }
            });
        },
        
        // Initialize wallet balance (call on page load)
        init: function() {
            // Set default balance if not exists
            if (this.getBalance() === 0 && !sessionStorage.getItem('walletBalance')) {
                this.setBalance(0);
            }
            
            // Update displays
            this.updateDisplays();
            
            console.log('Wallet Manager initialized. Current balance:', this.formatBalance(this.getBalance()));
        }
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.WalletManager.init();
        });
    } else {
        window.WalletManager.init();
    }
    
})();

// USAGE EXAMPLES:
// ================

// Get balance:
// let balance = WalletManager.getBalance();

// Add money:
// let newBalance = WalletManager.addMoney(1000);

// Set balance directly:
// WalletManager.setBalance(5000);

// Format balance:
// let formatted = WalletManager.formatBalance(5000); // Returns "₹5,000.00"

// Update all displays:
// WalletManager.updateDisplays();